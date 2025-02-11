import type { FastifySchema } from "fastify";
import { z } from "zod";
import { uuidSchema } from "./uuid.schema";

const bodySchema = z.object({
    title: z.string().min(1).max(127).optional(),
    description: z.string().optional(),
    isCompleted: z.boolean().optional()
});

export type updateTodoSchemaType = z.infer<typeof bodySchema>;
export const updateTodoFSchema: FastifySchema = { body: bodySchema, params: uuidSchema };
export interface IUpdateTodoSchema {
    Body: updateTodoSchemaType;
    Params: z.infer<typeof uuidSchema>;
}
