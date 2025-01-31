import { z } from "zod";
import type { FastifySchema } from "fastify";

export const shareTodoSchema = z.object({
    userId: z.string().uuid(),
});

export type ShareTodoSchema = z.infer<typeof shareTodoSchema>;
export const shareTodoFSchema: FastifySchema = { body: shareTodoSchema,};