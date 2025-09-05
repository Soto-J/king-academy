import "dotenv/config";

import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2";

declare global {
  var __db: ReturnType<typeof drizzle<Record<string, never>>> | undefined;
  var __pool: mysql.Pool | undefined;
}

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("Database url not found!");
}

if (!globalThis.__pool) {
  globalThis.__pool = mysql.createPool({
    uri: DATABASE_URL,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });
}

// Only create drizzle instance if it doesn't exist
if (!globalThis.__db) {
  globalThis.__db = drizzle(globalThis.__pool!);
}

export const db = globalThis.__db!
