import type { FastifySchema } from "fastify";
import { z } from "zod";
import { uuidSchema } from "./uuid.schema";

export const removeTodoSchema = z.object({
    id: uuidSchema
});

export type RemoveTodoSchema = z.infer<typeof removeTodoSchema>;
export const removeTodoFSchema: FastifySchema = { params: removeTodoSchema };
