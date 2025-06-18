import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const pushMigration = async () => {
    const migrationClient = postgres(
        process.env.NEXT_PUBLIC_DB_CONNECTIONSTRING,
        { max: 1 }
    );
    const migrationdb = drizzle(migrationClient);
    await migrate(migrationdb, {
        migrationsFolder: "./src/db/migration/drizzle",
    });
    await migrationClient.end();
};

pushMigration();
