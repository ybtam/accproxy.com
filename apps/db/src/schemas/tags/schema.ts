import {integer, pgTable, serial, varchar} from "drizzle-orm/pg-core";
import {users} from "../users";
import {relations} from "drizzle-orm";
import {fileTags} from "../files";

export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).unique().notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const tagsRelations = relations(tags, ({ many }) => ({
  fileTags: many(fileTags),
}));
