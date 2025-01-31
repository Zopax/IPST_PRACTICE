import type { FastifyReply, FastifyRequest } from "fastify";
import type { IHandlingResponseError } from "../../common/config/http-response";
import { sqlCon } from "../../common/config/kysely-config";
import { HandlingErrorType } from "../../common/enum/error-types";
import { HttpStatusCode } from "../../common/enum/http-status-code";
import { sendEmailNotification } from "../../common/config/mailer";
import * as todoRepository from "./repository.to-do";
import type { createTodoSchema } from "./schemas/create.schema";
import { getAllTodosSchema } from "./schemas/get-all-to-do.schema";
import type { updateTodoSchema } from "./schemas/update.schema";
import { RemoveTodoSchema } from "./schemas/remove-to-do.schema";
import { ShareTodoSchema } from "./schemas/share-to-do.schema";
import { RevokeAccessSchema } from "./schemas/revoke-access-to-do.schema";
import { ListGrantsSchema } from "./schemas/list-grants-to-do.schema";
import * as userRepository from "../user/repository.user";

export async function create(req: FastifyRequest<{ Body: createTodoSchema }>, rep: FastifyReply) {
    const creatorId = req.user.id as string;

    const newTodo = {
        ...req.body,
        creatorId,
        createdAt: new Date(),
        updatedAt: new Date(),
        isCompleted: false
    };

    const insertedTodo = await todoRepository.insert(sqlCon, newTodo);
    return rep.code(HttpStatusCode.CREATED).send(insertedTodo);
}

export async function getById(req: FastifyRequest<{ Params: { id: string } }>, rep: FastifyReply) {
    const { id } = req.params;
    const userId = req.user.id as string;

    const todo = await todoRepository.getByIdWithCreator(sqlCon, id);

    if (!todo) {
        const info: IHandlingResponseError = { type: HandlingErrorType.Found, property: "id" };
        return rep.code(HttpStatusCode.NOT_FOUND).send(info);
    }

    const isCreator = todo.creatorId === userId;
    const hasAccess = isCreator ? true : await todoRepository.hasAccessToObjective(sqlCon, id, userId);

    if (!hasAccess) {
        const info: IHandlingResponseError = { type: HandlingErrorType.Permission, property: "id" };
        return rep.code(HttpStatusCode.FORBIDDEN).send(info);
    }

    return rep.code(HttpStatusCode.OK).send(todo);
}

export async function getAll(req: FastifyRequest<{ Querystring: getAllTodosSchema }>, rep: FastifyReply) {
    const creatorId = req.user?.id as string;

    const todos = await todoRepository.getAllWithQuery(sqlCon, creatorId, req.query);

    return rep.code(HttpStatusCode.OK).send(todos);
}

export async function update(req: FastifyRequest<{ Params: { id: string }; Body: updateTodoSchema }>, rep: FastifyReply) {
    const { id } = req.params;
    const updatedTodo = await todoRepository.update(sqlCon, id, req.body);
    return rep.code(HttpStatusCode.OK).send(updatedTodo);
}

export async function remove(req: FastifyRequest<{ Params: RemoveTodoSchema }>, rep: FastifyReply) {
    const { id } = req.params;
    const removedTodo = await todoRepository.remove(sqlCon, id);
    if (!removedTodo) {
        const info: IHandlingResponseError = { type: HandlingErrorType.Found, property: "id" };
        return rep.code(HttpStatusCode.NOT_FOUND).send(info);
    }
    return rep.code(HttpStatusCode.OK).send(removedTodo);
}

export async function shareTodo(req: FastifyRequest<{ Params: { id: string }; Body: ShareTodoSchema }>, rep: FastifyReply) {
    const { id } = req.params;
    const { userId } = req.body;

    const shareEntity = {
        objectiveId: id,
        userId: userId,
    };

    const sharedTodo = await sqlCon.transaction().execute(async (trx) => {
        const sharedTodo = await todoRepository.shareTodo(trx, shareEntity);
        const userEmail = (await userRepository.getById(trx, userId)).email;
        const todoTitle = (await todoRepository.getById(trx, id)).title;

        await sendEmailNotification(userEmail, todoTitle);

        return sharedTodo;
    });

    return rep.code(HttpStatusCode.CREATED).send(sharedTodo);
}

export async function revokeAccess(req: FastifyRequest<{ Params: { id: string }; Body: RevokeAccessSchema }>, rep: FastifyReply) {
    const { id } = req.params;
    const { userId } = req.body;

    const revokedAccess = await todoRepository.revokeAccess(sqlCon, id, userId);
    return rep.code(HttpStatusCode.OK).send(revokedAccess);
}

export async function listGrants(req: FastifyRequest<{ Params: ListGrantsSchema }>, rep: FastifyReply) {
    const { id } = req.params;

    const grants = await todoRepository.listGrants(sqlCon, id);
    return rep.code(HttpStatusCode.OK).send(grants);
}