import fastifyAuth from "@fastify/auth";
import type { FastifyInstance } from "fastify";
import { checkTodoAccess, checkTodoAccessForSharing, checkTodoOwnership } from "../../common/config/middleware/middleware.to-do";
import * as todoController from "./controller.to-do";
import { createTodoFSchema } from "./schemas/create.schema";
import { getAllTodosFSchema } from "./schemas/get-all-to-do.schema";
import { getTodoByIdFSchema } from "./schemas/get-todo-by-id.schema";
import { listGrantsFSchema } from "./schemas/list-grants-to-do.schema";
import { removeTodoFSchema } from "./schemas/remove-to-do.schema";
import { revokeAccessFSchema } from "./schemas/revoke-access-to-do.schema";
import { shareTodoFSchema } from "./schemas/share-to-do.schema";
import { updateTodoFSchema } from "./schemas/update.schema";

export const todoRouter = async (app: FastifyInstance) => {
    await app.register(fastifyAuth);

    app.post("/", { schema: createTodoFSchema }, todoController.create);
    app.get("/:id", { schema: getTodoByIdFSchema, preHandler: app.auth([checkTodoOwnership, checkTodoAccess]) }, todoController.getById);
    app.get("/", { schema: getAllTodosFSchema }, todoController.getAll);
    app.patch("/:id", { schema: updateTodoFSchema, preHandler: app.auth([checkTodoOwnership]) }, todoController.update);
    app.delete("/:id", { preHandler: app.auth([checkTodoOwnership]), schema: removeTodoFSchema }, todoController.remove);
    app.post("/:id/share", { preHandler: app.auth([checkTodoAccess, checkTodoAccessForSharing]), schema: shareTodoFSchema }, todoController.shareTodo);
    app.delete("/:id/revoke", { preHandler: app.auth([checkTodoOwnership]), schema: revokeAccessFSchema }, todoController.revokeAccess);
    app.get("/:id/list-grants", { preHandler: app.auth([checkTodoOwnership]), schema: listGrantsFSchema }, todoController.listGrants);
};
