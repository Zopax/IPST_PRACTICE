import { Kysely } from "kysely";
import { DB } from "../../types/kysely/db.type";

export async function getTodoCreatorId(con: Kysely<DB>, todoId: string): Promise<{ creatorId: string } | undefined> {
    return await con.selectFrom("objectives").select("creatorId").where("id", "=", todoId).executeTakeFirst();
}
