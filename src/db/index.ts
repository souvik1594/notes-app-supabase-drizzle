import postgres from "postgres";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { drizzle } from "drizzle-orm/postgres-js";

if (!process.env.NEXT_PUBLIC_DB_CONNECTIONSTRING)
  throw "db connection string not provided";
const client = postgres(process.env.NEXT_PUBLIC_DB_CONNECTIONSTRING);
export const db = drizzle(client);

export default db;
