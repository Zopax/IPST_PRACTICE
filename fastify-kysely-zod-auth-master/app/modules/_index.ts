import type { FastifyInstance } from "fastify";
import { userRouter } from "./user/router.user";
import { todoRouter } from "./to-do/router.to-do";

interface IProvider {
    instance: (app: FastifyInstance) => Promise<void>;
    prefix: string;
}

export const HttpProvider: IProvider[] = [
    { instance: userRouter, prefix: "user" },
    { instance: todoRouter, prefix: "todo" },
];