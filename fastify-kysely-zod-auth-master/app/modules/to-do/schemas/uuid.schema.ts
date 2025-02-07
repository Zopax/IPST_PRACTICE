import { z } from "zod";

export const uuidSchema = z.string().uuid();

export type UuidSchema = z.infer<typeof uuidSchema>;
