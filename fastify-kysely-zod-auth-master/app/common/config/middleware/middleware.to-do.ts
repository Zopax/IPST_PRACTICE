import type { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import { HandlingErrorType, IHandlingResponseError } from "../http-response";
import { sqlCon } from "../kysely-config";
import { HttpStatusCode } from "../../enum/http-status-code";
import { getTodoCreatorId } from "./sql";

export async function checkTodoOwnership(req: FastifyRequest<{ Params: { id: string } }>, rep: FastifyReply, done: HookHandlerDoneFunction) {
    const { id } = req.params;
    const userId = req.user.id as string;

    const todo = await getTodoCreatorId(sqlCon, id);

    if (!todo) {
        const info: IHandlingResponseError = { type: HandlingErrorType.Found, property: "id" };
        return rep.code(HttpStatusCode.NOT_FOUND).send(info);
    }

    if (todo.creatorId !== userId) {
        const info: IHandlingResponseError = { type: HandlingErrorType.Permission, property: "id" };
        return rep.code(HttpStatusCode.FORBIDDEN).send(info);
    }

    done();
}