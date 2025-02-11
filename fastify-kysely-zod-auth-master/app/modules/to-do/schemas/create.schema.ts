import type { FastifySchema } from "fastify";
import { z } from "zod";

const bodySchema = z.object({
    title: z.string().min(1).max(127),
    description: z.string().optional()
});

export type createTodoSchemaType = z.infer<typeof bodySchema>;
export const createTodoFSchema: FastifySchema = { body: bodySchema };
