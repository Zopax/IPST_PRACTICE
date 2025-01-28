import type { FastifySchema } from "fastify";
import { z } from "zod";

const getTodoByIdSchema = z.object({
    id: z.string().uuid()
});

export type getTodoByIdSchema = z.infer<typeof getTodoByIdSchema>;
export const getTodoByIdFSchema: FastifySchema = { params: getTodoByIdSchema };
