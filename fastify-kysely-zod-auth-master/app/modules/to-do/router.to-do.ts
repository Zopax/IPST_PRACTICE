import type { FastifyInstance } from "fastify";
import * as todoController from "./controller.to-do";
import { checkTodoOwnership } from "../../common/config/middleware/middleware.to-do";
import { createTodoFSchema } from "./schemas/create.schema";
import { getAllTodosFSchema } from "./schemas/get-all-to-do.schema";
import { getTodoByIdFSchema } from "./schemas/get-todo-by-id.schema";
import { updateTodoFSchema } from "./schemas/update.schema";
import { removeTodoFSchema } from "./schemas/remove-to-do.schema";
import { listGrantsFSchema } from "./schemas/list-grants-to-do.schema";
import { revokeAccessFSchema } from "./schemas/revoke-access-to-do.schema";
import { shareTodoFSchema } from "./schemas/share-to-do.schema";

export const todoRouter = async (app: FastifyInstance) => {
    app.post("/", { schema: createTodoFSchema }, todoController.create);
    app.get("/:id", { schema: getTodoByIdFSchema }, todoController.getById);
    app.get("/", { schema: getAllTodosFSchema }, todoController.getAll);
    app.patch("/:id", { schema: updateTodoFSchema, preHandler: checkTodoOwnership }, todoController.update);
    app.delete("/:id", { preHandler: checkTodoOwnership, schema: removeTodoFSchema }, todoController.remove);
    app.post("/:id/share", { preHandler: checkTodoOwnership, schema: shareTodoFSchema }, todoController.shareTodo);
    app.delete("/:id/revoke", { preHandler: checkTodoOwnership, schema: revokeAccessFSchema }, todoController.revokeAccess);
    app.get("/:id/list-grants", { preHandler: checkTodoOwnership, schema: listGrantsFSchema }, todoController.listGrants);
};
