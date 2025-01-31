import { z } from "zod";
import type { FastifySchema } from "fastify";

export const listGrantsSchema = z.object({
    id: z.string().uuid(),
});

export type ListGrantsSchema = z.infer<typeof listGrantsSchema>;
export const listGrantsFSchema: FastifySchema = { params: listGrantsSchema };