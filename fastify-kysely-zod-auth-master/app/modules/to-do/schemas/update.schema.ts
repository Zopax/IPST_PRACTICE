import type { FastifySchema } from "fastify";
import { z } from "zod";

const updateTodoSchema = z.object({
    title: z.string().min(1).max(127).optional(),
    description: z.string().optional(),
    isCompleted: z.boolean().optional()
});

export type UpdateTodoSchema = z.infer<typeof updateTodoSchema>;
export const updateTodoFSchema: FastifySchema = { body: updateTodoSchema };
