import type { FastifySchema } from "fastify";
import { z } from "zod";

const toBoolean = (value: string) => {
    if (value === "true") return true;
    if (value === "false") return false;
    return undefined;
};

export const getAllTodosSchema = z.object({
    search: z.string().optional(),
    isCompleted: z.preprocess((val) => (typeof val === "string" ? toBoolean(val) : val), z.boolean().optional()),
    sortBy: z.enum(["title", "createdAt", "notifyAt"]).optional().default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).optional().default("asc"),
    limit: z.coerce.number().int().positive().optional().default(10),
    offset: z.coerce.number().int().nonnegative().optional().default(0)
});


export type getAllTodosSchema = z.infer<typeof getAllTodosSchema>;
export const getAllTodosFSchema: FastifySchema = { querystring: getAllTodosSchema };