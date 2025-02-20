import {integer, pgTable, primaryKey, serial} from "drizzle-orm/pg-core";
import {files} from "../schema";
import {tags} from "../../tags";
import {relations} from "drizzle-orm";

export const fileTags = pgTable(
  "file_tags",
  {
    fileId: integer("file_id")
      .notNull()
      .references(() => files.id, { onDelete: "cascade" }),
    tagId: integer("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({columns: [table.fileId, table.tagId]}),
  ]
);

export const fileTagsRelations = relations(fileTags, ({ one }) => ({
  file: one(files, {
    fields: [fileTags.fileId],
    references: [files.id],
  }),
  tag: one(tags, {
    fields: [fileTags.tagId],
    references: [tags.id],
  }),
}));
