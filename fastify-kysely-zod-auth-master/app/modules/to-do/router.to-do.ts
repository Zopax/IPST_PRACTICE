import type { FastifyInstance } from "fastify";
import * as todoController from "./controller.to-do";
import { createTodoFSchema } from "./schemas/create.schema";
import { updateTodoFSchema } from "./schemas/update.schema";
import { getAllTodosFSchema } from "./schemas/get-all-to-do.schema";
import { getTodoByIdFSchema } from "./schemas/get-todo-by-id.schema";

export const todoRouter = async (app: FastifyInstance) => {
    app.post("/",
        { schema: createTodoFSchema },
        todoController.create
    );
    app.get(
        "/:id",
        { schema: getTodoByIdFSchema },
        todoController.getById
    );
    app.get(
        "/",
        { schema: getAllTodosFSchema },
        todoController.getAll
    );
    app.patch(
        "/:id",
        { schema: updateTodoFSchema },
        todoController.update
    );
     app.delete(
        "/:id",
        todoController.remove
    );
};