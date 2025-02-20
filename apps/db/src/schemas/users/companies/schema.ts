import {integer, pgTable, varchar} from "drizzle-orm/pg-core";
import {users} from "../schema";
import {defaultColumns} from "../../default-columns";
import {relations} from "drizzle-orm";
import {files} from "../../files";

export const companies = pgTable("companies", {
  ...defaultColumns,
  name: varchar("name", { length: 255 }).notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const companiesRelations = relations(companies, ({ one, many }) => ({
  user: one(users, {
    fields: [companies.userId],
    references: [users.id],
  }),
  files: many(files),
}));
