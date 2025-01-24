import { z } from "zod";
import type { FastifySchema } from "fastify";

const toBoolean = (value: string) => {
    if (value === "true") return true;
    if (value === "false") return false;
    return undefined; 
};

const getAllTodosSchema = z.object({
    search: z.string().optional(),
    isCompleted: z.preprocess(
        (val) => (typeof val === "string" ? toBoolean(val) : val),
        z.boolean().optional()
    ),
    sortBy: z.enum(['title', 'createdAt', 'notifyAt']).optional(),
    sortOrder: z.enum(['asc', 'desc']).optional(),
    limit: z.preprocess(
        (val) => (typeof val === "string" ? parseInt(val, 10) : val),
        z.number().int().positive().optional()
    ),
    offset: z.preprocess(
        (val) => (typeof val === "string" ? parseInt(val, 10) : val),
        z.number().int().nonnegative().optional()
    ),
});

export type getAllTodosSchema = z.infer<typeof getAllTodosSchema>;
export const getAllTodosFSchema: FastifySchema = { querystring: getAllTodosSchema };