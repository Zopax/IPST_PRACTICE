import type { FastifySchema } from "fastify";
import { z } from "zod";
import { uuidSchema } from "./uuid.schema";

export const bodySchema = z.object({
    id: uuidSchema
});

export type removeTodoSchemaType = z.infer<typeof bodySchema>;
export const removeTodoFSchema: FastifySchema = { params: bodySchema };
export interface IRemoveTodoSchema {
    Body: removeTodoSchemaType;
    Params: z.infer<typeof uuidSchema>;
}
