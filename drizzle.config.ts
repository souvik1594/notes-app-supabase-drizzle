import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schemas/*.ts",
  out: "./src/db/migration/drizzle",
  dbCredentials: {
    url: "postgresql://postgres.blgsvuyzaebdzocqecgd:Souvik@310594!@aws-0-ap-south-1.pooler.supabase.com:6543/postgres",
  },
});
