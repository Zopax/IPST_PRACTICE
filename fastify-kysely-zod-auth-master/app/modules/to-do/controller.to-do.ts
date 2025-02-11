import type { FastifyReply, FastifyRequest } from "fastify";
import type { IHandlingResponseError } from "../../common/config/http-response";
import { sqlCon } from "../../common/config/kysely-config";
import { sendEmailNotification } from "../../common/config/mailer";
import { HandlingErrorType } from "../../common/enum/error-types";
import { HttpStatusCode } from "../../common/enum/http-status-code";
import * as userRepository from "../user/repository.user";
import * as todoRepository from "./repository.to-do";
import type { createTodoSchemaType } from "./schemas/create.schema";
import { getAllTodosSchemaType } from "./schemas/get-all-to-do.schema";
import { listGrantsSchemaType } from "./schemas/list-grants-to-do.schema";
import { IRemoveTodoSchema } from "./schemas/remove-to-do.schema";
import { revokeAccessSchemaType } from "./schemas/revoke-access-to-do.schema";
import { IShareTodoSchema } from "./schemas/share-to-do.schema";
import type { IUpdateTodoSchema } from "./schemas/update.schema";

export async function create(req: FastifyRequest<{ Body: createTodoSchemaType }>, rep: FastifyReply) {
    const creatorId = req.user.id as string;

    const newTodo = {
        ...req.body,
        creatorId,
        isCompleted: false
    };

    const insertedTodo = await todoRepository.insert(sqlCon, newTodo);
    return rep.code(HttpStatusCode.CREATED).send(insertedTodo);
}

export async function getById(req: FastifyRequest<{ Params: { id: string } }>, rep: FastifyReply) {
    const { id } = req.params;

    const todo = await todoRepository.getByIdWithCreator(sqlCon, id);

    if (!todo) {
        const info: IHandlingResponseError = { type: HandlingErrorType.Found, property: "id" };
        return rep.code(HttpStatusCode.NOT_FOUND).send(info);
    }

    return rep.code(HttpStatusCode.OK).send(todo);
}

export async function getAll(req: FastifyRequest<{ Querystring: getAllTodosSchemaType }>, rep: FastifyReply) {
    const creatorId = req.user?.id as string;

    const todos = await todoRepository.getAllWithQuery(sqlCon, creatorId, req.query);

    return rep.code(HttpStatusCode.OK).send(todos);
}

export async function update(req: FastifyRequest<IUpdateTodoSchema>, rep: FastifyReply) {
    const { id } = req.params;

    const updatedTodo = await todoRepository.update(sqlCon, id, req.body);
    return rep.code(HttpStatusCode.OK).send(updatedTodo);
}

export async function remove(req: FastifyRequest<IRemoveTodoSchema>, rep: FastifyReply) {
    const { id } = req.params;

    const removedTodo = await todoRepository.remove(sqlCon, id);

    if (!removedTodo) {
        const info: IHandlingResponseError = { type: HandlingErrorType.Found, property: "id" };
        return rep.code(HttpStatusCode.NOT_FOUND).send(info);
    }
    return rep.code(HttpStatusCode.OK).send(removedTodo);
}

export async function shareTodo(req: FastifyRequest<IShareTodoSchema>, rep: FastifyReply) {
    const { id } = req.params;
    const { userId } = req.body;
    const shareEntity = {
        objectiveId: id,
        userId: userId
    };

    const hasAccess = await todoRepository.hasAccessToObjective(sqlCon, id, userId);

    if (hasAccess) {
        const info: IHandlingResponseError = { type: HandlingErrorType.Busy, property: "id", message: "This user already has access to the objective." };
        return rep.code(HttpStatusCode.BAD_REQUEST).send(info);
    }

    const sharedTodo = await todoRepository.shareTodo(sqlCon, shareEntity);
    const userEmail = (await userRepository.getById(sqlCon, userId)).email;
    const todoTitle = (await todoRepository.getById(sqlCon, id)).title;

    await sendEmailNotification(userEmail, todoTitle);

    return rep.code(HttpStatusCode.CREATED).send(sharedTodo);
}

export async function revokeAccess(req: FastifyRequest<{ Params: { id: string }; Body: revokeAccessSchemaType }>, rep: FastifyReply) {
    const { id } = req.params;
    const { userId } = req.body;

    const revokedAccess = await todoRepository.revokeAccess(sqlCon, id, userId);
    return rep.code(HttpStatusCode.OK).send(revokedAccess);
}

export async function listGrants(req: FastifyRequest<{ Params: listGrantsSchemaType }>, rep: FastifyReply) {
    const { id } = req.params;

    const grants = await todoRepository.listGrants(sqlCon, id);
    return rep.code(HttpStatusCode.OK).send(grants);
}
