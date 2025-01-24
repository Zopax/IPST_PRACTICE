import { z } from "zod";
import type { FastifySchema } from "fastify";

const getTodoByIdSchema = z.object({
    id: z.string().uuid(),
});

export type getTodoByIdSchema = z.infer<typeof getTodoByIdSchema>;
export const getTodoByIdFSchema: FastifySchema = { params: getTodoByIdSchema };