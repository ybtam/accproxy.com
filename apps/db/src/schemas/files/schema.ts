import {bigint, integer, pgTable, varchar} from "drizzle-orm/pg-core";
import {companies, users} from "../users";
import {defaultColumns} from "../default-columns";
import {relations} from "drizzle-orm";

export const files = pgTable("files", {
  ...defaultColumns,
  filename: varchar("filename", { length: 255 }).notNull(),
  originalFilename: varchar("original_filename", { length: 255 }).notNull(),
  mimeType: varchar("mime_type", { length: 255 }).notNull(),
  size: bigint("size", { mode: "number" }).notNull(), // File size in bytes
  storagePath: varchar("storage_path", { length: 255 }).notNull(), // Path to the file in object storage (e.g., S3)
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  companyId: integer("company_id")
    .notNull()
    .references(() => companies.id, { onDelete: "cascade" }),
});

export const filesRelations = relations(files, ({ one }) => ({
  company: one(companies, {
    fields: [files.companyId],
    references: [companies.id],
  }),
  user: one(users, {
    fields: [files.userId],
    references: [users.id],
  }),
}));
