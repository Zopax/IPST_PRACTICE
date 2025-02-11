import type { FastifySchema } from "fastify";
import { z } from "zod";

export const bodySchema = z.object({
    id: z.string().uuid()
});

export type listGrantsSchemaType = z.infer<typeof bodySchema>;
export const listGrantsFSchema: FastifySchema = { params: bodySchema };
