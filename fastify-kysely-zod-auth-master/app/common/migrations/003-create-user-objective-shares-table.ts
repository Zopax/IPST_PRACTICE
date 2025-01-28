import { type Kysely, sql } from "kysely";

export async function up(db: Kysely<any>) {
    await db.schema
        .createTable("user_objective_shares")
        .addColumn("id", "uuid", (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
        .addColumn("userId", "uuid", (col) => col.references("users.id").onDelete("cascade").notNull())
        .addColumn("objectiveId", "uuid", (col) => col.references("objectives.id").onDelete("cascade").notNull())
        .execute();
}

export async function down(db: Kysely<any>) {
    await db.schema.dropTable("user_objective_shares").execute();
}
