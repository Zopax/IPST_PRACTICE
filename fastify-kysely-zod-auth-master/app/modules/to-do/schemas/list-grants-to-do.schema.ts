import type { FastifySchema } from "fastify";
import { z } from "zod";
import { uuidSchema } from "./uuid.schema";

export const listGrantsSchema = z.object({
    id: uuidSchema
});

export type ListGrantsSchema = z.infer<typeof listGrantsSchema>;
export const listGrantsFSchema: FastifySchema = { params: listGrantsSchema };
