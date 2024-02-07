import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { migrate } from 'drizzle-orm/libsql/migrator';
import "dotenv/config";

async function main() {
    console.log('Running migrations')

    const config = {
        url: process.env.TURSO_DATABASE_URL!,
        // authToken: process.env.TURSO_AUTH_TOKEN!
    }

    const sql = createClient(config)

    console.log('Client created!')

    const db = drizzle(sql);

    console.log('Drizzle db created!')

    await migrate(db, { migrationsFolder: "./src/server/db/migrations" });

    console.log('Migrated successfully')

    process.exit(0)
}

main().catch((e) => {
    console.error('Migration failed')
    console.error(e)
    process.exit(1)
});