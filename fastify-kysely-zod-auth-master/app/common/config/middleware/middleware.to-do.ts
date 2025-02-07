import type { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";
import * as todoRepository from "../../../modules/to-do/repository.to-do";
import { HttpStatusCode } from "../../enum/http-status-code";
import { AccessDeniedException } from "../../exceptions/access-denied.exception";
import { CustomException } from "../../exceptions/custom-exception";
import { sqlCon } from "../kysely-config";
import { getTodoCreatorId } from "./sql";

export async function checkTodoOwnership(req: FastifyRequest<{ Params: { id: string } }>, rep: FastifyReply, done: HookHandlerDoneFunction) {
    const { id } = req.params;
    const userId = req.user.id as string;

    const todo = await getTodoCreatorId(sqlCon, id);

    if (!todo) {
        throw new CustomException(HttpStatusCode.NOT_FOUND, "Todo not found");
    }

    if (todo.creatorId !== userId) {
        throw new AccessDeniedException();
    }

    done();
}

export async function checkTodoAccess(req: FastifyRequest<{ Params: { id: string } }>, rep: FastifyReply, done: HookHandlerDoneFunction) {
    const { id } = req.params;
    const userId = req.user.id as string;

    const todo = await getTodoCreatorId(sqlCon, id);

    if (!todo) {
        throw new CustomException(HttpStatusCode.NOT_FOUND, "Todo not found");
    }

    const isCreator = todo.creatorId === userId;
    const hasAccess = isCreator ? true : await todoRepository.hasAccessToObjective(sqlCon, id, userId);

    if (!hasAccess) {
        throw new AccessDeniedException();
    }

    done();
}

export async function checkTodoAccessForSharing(req: FastifyRequest<{ Params: { id: string }; Body: { userId: string } }>, rep: FastifyReply, done: HookHandlerDoneFunction) {
    const { id } = req.params;
    const { userId } = req.body;

    const hasAccess = await todoRepository.hasAccessToObjective(sqlCon, id, userId);

    if (hasAccess) {
        throw new CustomException(HttpStatusCode.CONFLICT, "This user already has access to the objective.");
    }

    done();
}
