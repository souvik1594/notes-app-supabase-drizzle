import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schemas/*.ts",
  out: "./src/db/migration/drizzle",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DB_CONNECTIONSTRING!,
  },
});
