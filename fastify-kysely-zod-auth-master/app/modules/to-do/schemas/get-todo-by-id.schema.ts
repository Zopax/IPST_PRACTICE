import type { FastifySchema } from "fastify";
import { z } from "zod";
import { uuidSchema } from "./uuid.schema";

export const getTodoByIdSchema = z.object({
    id: uuidSchema
});

export type GetTodoByIdSchema = z.infer<typeof getTodoByIdSchema>;
export const getTodoByIdFSchema: FastifySchema = { params: getTodoByIdSchema };
