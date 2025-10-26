import { drizzle } from 'drizzle-orm/neon-http'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in environment variables')
}

export const db = drizzle(process.env.DATABASE_URL)

// DOCS: https://orm.drizzle.team/docs/get-started/neon-new
// If you need a synchronous connection,
// you can use our additional connection API,
// where you specify a driver connection and pass it to the Drizzle instance.

// import { neon } from '@neondatabase/serverless';
// import { drizzle } from 'drizzle-orm/neon-http';
// const sql = neon(process.env.DATABASE_URL!);
// const db = drizzle({ client: sql });
