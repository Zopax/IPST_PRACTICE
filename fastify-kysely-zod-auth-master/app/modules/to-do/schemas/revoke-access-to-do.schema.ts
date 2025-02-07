import type { FastifySchema } from "fastify";
import { z } from "zod";
import { uuidSchema } from "./uuid.schema";

export const todoIdParamsSchema = z.object({
    id: uuidSchema
});

export const revokeAccessSchema = z.object({
    userId: uuidSchema
});

export type RevokeAccessSchema = z.infer<typeof revokeAccessSchema>;

export const revokeAccessFSchema: FastifySchema = {
    params: todoIdParamsSchema,
    body: revokeAccessSchema
};
