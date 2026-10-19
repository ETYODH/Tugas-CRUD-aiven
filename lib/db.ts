import "server-only";
import { Pool } from "pg";
import fs from "node:fs";
import path from "node:path";

const caPath = path.join(process.cwd(), "ca.pem");
const ca = fs.readFileSync(caPath, "utf8");

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    ca,
    rejectUnauthorized: true,
  },
});