import type { FastifySchema } from "fastify";
import { z } from "zod";
import { uuidSchema } from "./uuid.schema";

export const bodySchema = z.object({
    userId: z.string().uuid()
});

export type shareTodoSchemaType = z.infer<typeof bodySchema>;
export const shareTodoFSchema: FastifySchema = { body: bodySchema };
export interface IShareTodoSchema {
    Body: shareTodoSchemaType;
    Params: z.infer<typeof uuidSchema>;
}
