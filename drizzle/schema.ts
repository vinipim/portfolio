import { mysqlEnum, mysqlTable, text, timestamp, varchar, int } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Admin credentials table for custom authentication
 */
export const adminCredentials = mysqlTable("adminCredentials", {
  id: varchar("id", { length: 64 }).primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  passwordHash: text("passwordHash").notNull(),
  name: text("name"),
  createdAt: timestamp("createdAt").defaultNow(),
  lastLogin: timestamp("lastLogin"),
});

export type AdminCredential = typeof adminCredentials.$inferSelect;
export type InsertAdminCredential = typeof adminCredentials.$inferInsert;

/**
 * Posts table for blog content
 */
export const posts = mysqlTable("posts", {
  id: varchar("id", { length: 64 }).primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  coverImage: text("coverImage"),
  category: varchar("category", { length: 100 }).notNull(),
  featured: mysqlEnum("featured", ["yes", "no"]).default("no").notNull(),
  publishedAt: timestamp("publishedAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
  authorId: varchar("authorId", { length: 64 }),
});

export type Post = typeof posts.$inferSelect;
export type InsertPost = typeof posts.$inferInsert;

/**
 * Reviews table for films, albums, and books
 * Supports integration with TMDb, Last.fm, and Google Books APIs
 */
export const reviews = mysqlTable("reviews", {
  id: varchar("id", { length: 64 }).primaryKey(),
  type: mysqlEnum("type", ["film", "album", "book"]).notNull(),
  title: text("title").notNull(),
  creator: text("creator"), // Director, Artist, or Author
  year: int("year"),
  rating: int("rating").notNull(), // 1-5
  notes: text("notes"),
  tags: text("tags"), // JSON array of tags
  coverImage: text("coverImage"),
  apiId: varchar("apiId", { length: 255 }), // ID from external API
  metadata: text("metadata"), // JSON with additional data from APIs
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
  userId: varchar("userId", { length: 64 }),
});

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;
