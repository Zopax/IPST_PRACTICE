import type { FastifyReply, FastifyRequest } from "fastify";
import * as todoRepository from "../../../modules/to-do/repository.to-do";
import { HttpStatusCode } from "../../enum/http-status-code";
import { AccessDeniedException } from "../../exceptions/access-denied.exception";
import { CustomException } from "../../exceptions/custom-exception";
import { sqlCon } from "../kysely-config";
import { getTodoCreatorId } from "./sql";

export async function checkTodoOwnership(req: FastifyRequest<{ Params: { id: string } }>, _rep: FastifyReply) {
    const { id } = req.params;
    const userId = req.user.id as string;

    const todo = await getTodoCreatorId(sqlCon, id);

    if (!todo) {
        throw new CustomException(HttpStatusCode.NOT_FOUND, "Todo not found");
    }

    if (todo.creatorId !== userId) {
        throw new AccessDeniedException();
    }
}

export async function checkTodoAccess(req: FastifyRequest<{ Params: { id: string } }>, _rep: FastifyReply) {
    const { id } = req.params;
    const userId = req.user.id!;

    const todo = await getTodoCreatorId(sqlCon, id);

    if (!todo) {
        throw new CustomException(HttpStatusCode.NOT_FOUND, "Todo not found");
    }

    const hasAccess = await todoRepository.hasAccessToObjective(sqlCon, id, userId);

    if (!hasAccess) {
        throw new AccessDeniedException();
    }
}