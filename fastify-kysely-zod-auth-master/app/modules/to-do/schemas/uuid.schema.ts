import { z } from "zod";

export const uuidSchema = z.object({ id: z.string().uuid() });

export type uuidSchemaType = z.infer<typeof uuidSchema>;
