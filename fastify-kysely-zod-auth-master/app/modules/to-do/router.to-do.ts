import type { FastifyInstance } from "fastify";
import * as todoController from "./controller.to-do";
import { checkTodoOwnership } from "./middleware.to-do";
import { createTodoFSchema } from "./schemas/create.schema";
import { getAllTodosFSchema } from "./schemas/get-all-to-do.schema";
import { getTodoByIdFSchema } from "./schemas/get-todo-by-id.schema";
import { updateTodoFSchema } from "./schemas/update.schema";

export const todoRouter = async (app: FastifyInstance) => {
    app.post("/", { schema: createTodoFSchema }, todoController.create);
    app.get("/:id", { schema: getTodoByIdFSchema }, todoController.getById);
    app.get("/", { schema: getAllTodosFSchema }, todoController.getAll);
    app.patch("/:id", { schema: updateTodoFSchema, preHandler: checkTodoOwnership }, todoController.update);
    app.delete("/:id", { preHandler: checkTodoOwnership }, todoController.remove);
    app.post("/:id/share", { preHandler: checkTodoOwnership }, todoController.shareTodo);
    app.delete("/:id/revoke", { preHandler: checkTodoOwnership }, todoController.revokeAccess);
    app.get("/:id/list-grants", { preHandler: checkTodoOwnership }, todoController.listGrants);
};
