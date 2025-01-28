import type { FastifyReply, FastifyRequest } from "fastify";
import type { IHandlingResponseError } from "../../common/config/http-response";
import { sqlCon } from "../../common/config/kysely-config";
import { HandlingErrorType } from "../../common/enum/error-types";
import { HttpStatusCode } from "../../common/enum/http-status-code";
import * as todoRepository from "./repository.to-do";
import type { createTodoSchema } from "./schemas/create.schema";
import { getAllTodosSchema } from "./schemas/get-all-to-do.schema";
import type { updateTodoSchema } from "./schemas/update.schema";

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
    const todo = await todoRepository.getByIdWithCreator(sqlCon, id);
    if (!todo) {
        const info: IHandlingResponseError = { type: HandlingErrorType.Found, property: "id" };
        return rep.code(HttpStatusCode.NOT_FOUND).send(info);
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

export async function remove(req: FastifyRequest<{ Params: { id: string } }>, rep: FastifyReply) {
    const { id } = req.params;
    const removedTodo = await todoRepository.remove(sqlCon, id);
    if (!removedTodo) {
        const info: IHandlingResponseError = { type: HandlingErrorType.Found, property: "id" };
        return rep.code(HttpStatusCode.NOT_FOUND).send(info);
    }
    return rep.code(HttpStatusCode.OK).send(removedTodo);
}
