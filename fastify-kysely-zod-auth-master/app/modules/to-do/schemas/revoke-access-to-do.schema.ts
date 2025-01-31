import { z } from "zod";
import type { FastifySchema } from "fastify";

export const revokeAccessSchema = z.object({
    userId: z.string().uuid(),
});

export type RevokeAccessSchema = z.infer<typeof revokeAccessSchema>;

export const revokeAccessFSchema: FastifySchema = {
    params: z.object({
        id: z.string().uuid(),
    }),
    body: revokeAccessSchema,
};