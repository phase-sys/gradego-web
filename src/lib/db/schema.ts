import { integer, pgTable, varchar, timestamp } from 'drizzle-orm/pg-core'

// =====================
// USERS TABLE
// =====================
export const users = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(), // hashed password
  role: varchar('role', { length: 50 }).default('teacher').notNull(),

  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
})

// =====================
// TEACHERS TABLE
// =====================
export const teachers = pgTable('teachers', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  firstName: varchar('first_name', { length: 100 }).notNull(),
  middleName: varchar('middle_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  extension: varchar('extension', { length: 20 }),

  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().notNull(),
})
