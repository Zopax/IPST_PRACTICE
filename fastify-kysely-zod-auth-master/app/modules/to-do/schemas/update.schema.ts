import { z } from "zod";
import type { FastifySchema } from "fastify";

const updateTodoSchema = z.object({
    title: z.string().min(1).max(127).optional(),
    description: z.string().optional(),
    isCompleted: z.boolean().optional(),
});

export type updateTodoSchema = z.infer<typeof updateTodoSchema>;
export const updateTodoFSchema: FastifySchema = { body: updateTodoSchema };