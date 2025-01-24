import { type Insertable, type Kysely, Transaction, type Selectable, sql } from "kysely";
import { DB, Objectives } from "../../common/types/kysely/db.type";

type InsertableObjectiveRowType = Insertable<Objectives>;
type SelectableObjectiveRowType = Selectable<Objectives>;

export async function insert(con: Kysely<DB> | Transaction<DB>, entity: InsertableObjectiveRowType) {
    return await con
        .insertInto("objectives")
        .returningAll()
        .values(entity)
        .executeTakeFirstOrThrow();
}

export async function getById(con: Kysely<DB> | Transaction<DB>, id: string) {
    return await con
        .selectFrom("objectives")
        .selectAll()
        .where("id", "=", id)
        .executeTakeFirstOrThrow();
}

export async function getByIdWithCreator(con: Kysely<DB> | Transaction<DB>, id: string) {
    return await con.selectFrom("objectives")
        .innerJoin("users", "users.id", "objectives.creatorId")
        .selectAll("objectives")
        .select(sql<string>`users.name`.as("creatorName"))
        .where("objectives.id", "=", id)
        .executeTakeFirstOrThrow();
}
export async function getAllByUserId(con: Kysely<DB> | Transaction<DB>, userId: string): Promise<SelectableObjectiveRowType[]> {
    return await con
        .selectFrom("objectives")
        .selectAll()
        .where("creatorId", "=", userId)
        .execute();
}


export async function update(
    con: Kysely<DB> | Transaction<DB>,
    id: string,
    entity: Partial<InsertableObjectiveRowType>
) {
    return await con
        .updateTable("objectives")
        .set(entity)
        .where("id", "=", id)
        .returningAll()
        .executeTakeFirstOrThrow();
}

export async function remove(con: Kysely<DB> | Transaction<DB>, id: string) {
    return await con
        .deleteFrom("objectives")
        .where("id", "=", id)
        .returningAll()
        .executeTakeFirstOrThrow();
}

export async function getAllWithQuery(
    con: Kysely<DB>,
    userId: string,
    search?: string,
    isCompleted?: boolean,
    sortBy: 'title' | 'createdAt' | 'notifyAt' = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'asc',
    limit: number = 10,
    offset: number = 0,
): Promise<SelectableObjectiveRowType[]> {
    let q = con.selectFrom("objectives")
        .selectAll()
        .where("creatorId", "=", userId);

    if (search) {
        q = q.where("title", "like", `%${search}%`);
    }

    if (isCompleted !== undefined) {
        q = q.where("isCompleted", "=", isCompleted);
    }

    const allowedSortColumns = ['title', 'createdAt', 'notifyAt'];
    if (!allowedSortColumns.includes(sortBy)) {
        throw new Error(`Invalid sortBy value: ${sortBy}`);
    }

    if (sortOrder !== 'asc' && sortOrder !== 'desc') {
        throw new Error(`Invalid sortOrder value: ${sortOrder}`);
    }

    q = q.orderBy(sortBy, sortOrder);

    q = q.limit(limit).offset(offset);

    return await q.execute();
}