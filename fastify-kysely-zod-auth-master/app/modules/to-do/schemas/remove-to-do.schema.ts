import { z } from "zod";
import type { FastifySchema } from "fastify";

export const removeTodoSchema = z.object({
    id: z.string().uuid(),
});

export type RemoveTodoSchema = z.infer<typeof removeTodoSchema>;
export const removeTodoFSchema: FastifySchema = { params: removeTodoSchema, };