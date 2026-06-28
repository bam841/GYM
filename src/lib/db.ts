import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set in your environment variables. Please add it to your .env file.");
}

export const pool = new Pool({
  connectionString,
  // Add SSL configuration if connecting to Supabase (non-localhost)
  ssl: connectionString.includes("localhost") || connectionString.includes("127.0.0.1")
    ? false
    : { rejectUnauthorized: false },
});

export async function query(text: string, params?: any[]) {
  return pool.query(text, params);
}
