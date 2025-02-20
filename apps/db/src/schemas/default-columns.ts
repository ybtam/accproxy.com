import {serial, timestamp} from "drizzle-orm/pg-core";

export const defaultColumns = {
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => new Date()),
  id: serial("id").primaryKey(),
}
