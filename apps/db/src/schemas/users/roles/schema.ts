// User Roles (for future SaaS implementation)
import {integer, pgTable, primaryKey, serial, varchar} from "drizzle-orm/pg-core";
import {relations} from "drizzle-orm";
import {users} from "../schema";

export const roles = pgTable("roles", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).unique().notNull(), // e.g., "Admin", "Accountant", "User"
});

export const rolesRelations = relations(roles, ({ many }) => ({
  userRoles: many(userRoles),
}));

// User Roles Assignment (Many-to-Many relationship between users and roles)
export const userRoles = pgTable(
  "user_roles",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    roleId: integer("role_id")
      .notNull()
      .references(() => roles.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({columns: [table.userId, table.roleId]}),
  ]
);

export const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(users, {
    fields: [userRoles.userId],
    references: [users.id],
  }),
  role: one(roles, {
    fields: [userRoles.roleId],
    references: [roles.id],
  }),
}));
