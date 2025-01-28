import { ExpressionBuilder, type Insertable, type Kysely, type Selectable, sql, Transaction } from "kysely";
import { DB, Objectives } from "../../common/types/kysely/db.type";
import { getAllTodosSchema } from "./schemas/get-all-to-do.schema";

type InsertableObjectiveRowType = Insertable<Objectives>;
type SelectableObjectiveRowType = Selectable<Objectives>;

export async function insert(con: Kysely<DB> | Transaction<DB>, entity: InsertableObjectiveRowType) {
    return await con.insertInto("objectives").returningAll().values(entity).executeTakeFirstOrThrow();
}

export async function getById(con: Kysely<DB> | Transaction<DB>, id: string) {
    return await con.selectFrom("objectives").selectAll().where("id", "=", id).executeTakeFirstOrThrow();
}

export async function getByIdWithCreator(con: Kysely<DB> | Transaction<DB>, id: string) {
    return await con
        .selectFrom("objectives")
        .innerJoin("users", "users.id", "objectives.creatorId")
        .selectAll("objectives")
        .select(sql<string>`users.name`.as("creatorName"))
        .where("objectives.id", "=", id)
        .executeTakeFirstOrThrow();
}
export async function getAllByUserId(con: Kysely<DB> | Transaction<DB>, userId: string): Promise<SelectableObjectiveRowType[]> {
    return await con.selectFrom("objectives").selectAll().where("creatorId", "=", userId).execute();
}

export async function update(con: Kysely<DB> | Transaction<DB>, id: string, entity: Partial<InsertableObjectiveRowType>) {
    return await con.updateTable("objectives").set(entity).where("id", "=", id).returningAll().executeTakeFirstOrThrow();
}

export async function remove(con: Kysely<DB> | Transaction<DB>, id: string) {
    return await con.deleteFrom("objectives").where("id", "=", id).returningAll().executeTakeFirstOrThrow();
}

export async function getAllWithQuery(con: Kysely<DB>, userId: string, queryParams: getAllTodosSchema): Promise<SelectableObjectiveRowType[]> {
    const conditions = (eb: ExpressionBuilder<DB, "objectives">) => {
        const expressions = [eb("creatorId", "=", userId)];

        if (queryParams.search) {
            expressions.push(eb("title", "ilike", `%${queryParams.search}%`));
        }

        if (queryParams.isCompleted !== undefined) {
            expressions.push(eb("isCompleted", "=", queryParams.isCompleted));
        }

        return eb.and(expressions);
    };

    const sortBy = queryParams.sortBy || "createdAt";
    const sortOrder = queryParams.sortOrder || "asc";
    const limit = queryParams.limit || 10;
    const offset = queryParams.offset || 0;

    const query = con.selectFrom("objectives").selectAll().where(conditions).orderBy(sortBy, sortOrder).limit(limit).offset(offset);

    return await query.execute();
}
