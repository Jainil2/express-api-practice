import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core'
import { usersTable } from './users.js'
import { relations } from 'drizzle-orm'
export const postTable = pgTable('post', {
    id: uuid('id').primaryKey().defaultRandom(),
    title: varchar({ length: 255 }).notNull(),
    content: text('content').notNull(),
    authorId: uuid('author_id')
        .notNull()
        .references(() => usersTable.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    deletedAt: timestamp('deleted_at').defaultNow(),
})

export const postRelations = relations(postTable, ({one}) => ({
    invitee: one(postTable, {
        fields : [postTable.authorId],
        references : [usersTable.id]
    }),
}));
