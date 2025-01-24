import { z } from "zod";
import type { FastifySchema } from "fastify";

const createTodoSchema = z.object({
    title: z.string().min(1).max(127),
    description: z.string().optional(),
});

export type createTodoSchema = z.infer<typeof createTodoSchema>;
export const createTodoFSchema: FastifySchema = { body: createTodoSchema };