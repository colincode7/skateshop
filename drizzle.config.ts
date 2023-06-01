import * as dotenv from "dotenv"
import type { Config } from "drizzle-kit"

dotenv.config()

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  connectionString: process.env.DATABASE_URL,
} satisfies Config
