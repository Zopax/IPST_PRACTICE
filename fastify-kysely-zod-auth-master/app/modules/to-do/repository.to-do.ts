import { ExpressionBuilder, type Insertable, type Kysely, type Selectable, Transaction } from "kysely";
import { DB, Objectives, UserObjectiveShares } from "../../common/types/kysely/db.type";
import { getAllTodosSchemaType } from "./schemas/get-all-to-do.schema";

type InsertableObjectiveRowType = Insertable<Objectives>;
type UserObjectiveSharesRowType = Insertable<UserObjectiveShares>;
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
        .select("users.name as creatorName")
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

export async function getAllWithQuery(con: Kysely<DB>, userId: string, queryParams: getAllTodosSchemaType): Promise<SelectableObjectiveRowType[]> {
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

    const query = con.selectFrom("objectives").selectAll().where(conditions).orderBy(queryParams.sortBy, queryParams.sortOrder).limit(queryParams.limit).offset(queryParams.offset);

    return await query.execute();
}

export async function shareTodo(con: Kysely<DB> | Transaction<DB>, entity: UserObjectiveSharesRowType) {
    return await con
        .insertInto("user_objective_shares")
        .values(entity)
        .onConflict((oc) => oc.column("id").doNothing())
        .returningAll()
        .executeTakeFirstOrThrow();
}

export async function revokeAccess(con: Kysely<DB>, objectiveId: string, userId: string) {
    return await con.deleteFrom("user_objective_shares").where("objectiveId", "=", objectiveId).where("userId", "=", userId).returningAll().executeTakeFirstOrThrow();
}

export async function listGrants(con: Kysely<DB>, objectiveId: string) {
    return await con
        .selectFrom("user_objective_shares")
        .innerJoin("users", "users.id", "user_objective_shares.userId")
        .select(["users.id", "users.name", "users.email"])
        .where("objectiveId", "=", objectiveId)
        .execute();
}

export async function hasAccessToObjective(con: Kysely<DB>, objectiveId: string, userId: string): Promise<boolean> {
    const access = await con.selectFrom("user_objective_shares").select("id").where("objectiveId", "=", objectiveId).where("userId", "=", userId).executeTakeFirst();

    return !!access;
}
