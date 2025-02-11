import type { FastifySchema } from "fastify";
import { z } from "zod";
import { uuidSchema } from "./uuid.schema";

export const bodySchema = z.object({
    id: uuidSchema
});

export type getTodoByIdSchemaType = z.infer<typeof bodySchema>;
export const getTodoByIdFSchema: FastifySchema = { params: bodySchema };
