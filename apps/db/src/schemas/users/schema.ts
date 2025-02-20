import {pgTable, text} from "drizzle-orm/pg-core";
import {defaultColumns} from "../default-columns";
import {relations} from "drizzle-orm";
import {companies} from "./companies/schema";


export const users = pgTable('users', {
  ...defaultColumns,
  email: text('email').notNull().unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  password: text('password').notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
  companies: many(companies),
}));
