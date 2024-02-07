import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
    schema: "./src/server/db/schema.ts",
    out: "./src/server/db/migrations",
    driver: "turso",
    dbCredentials: {
        url: process.env.TURSO_DATABASE_URL!,
        authToken: process.env.TURSO_AUTH_TOKEN!,
    },
    tablesFilter: ["dz_*"],
} satisfies Config;