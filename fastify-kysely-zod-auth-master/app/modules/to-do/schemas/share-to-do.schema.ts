import type { FastifySchema } from "fastify";
import { z } from "zod";
import { uuidSchema } from "./uuid.schema";

export const shareTodoSchema = z.object({
    userId: uuidSchema
});

export type ShareTodoSchema = z.infer<typeof shareTodoSchema>;
export const shareTodoFSchema: FastifySchema = { body: shareTodoSchema };
