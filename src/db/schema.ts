import { nanoid } from "nanoid";

import {
  mysqlTable,
  varchar,
  text,
  timestamp,
  boolean,
  date,
  char,
  mysqlEnum,
  index,
} from "drizzle-orm/mysql-core";

// ============================================================================
// CONSTANTS & ENUMS
// ============================================================================

export const roles = ["admin", "member"] as const;

export const BATTING_ORIENTATION = ["right", "left", "switch"] as const;
export const THROWING_ORIENTATION = ["right", "left", "switch"] as const;
export const POSITIONS = [
  "pitcher",
  "catcher",
  "first_base",
  "second_base",
  "third_base",
  "short_stop",
  "left_field",
  "center_field",
  "right_field",
  "designated_hitter",
  "bench",
] as const;

// ============================================================================
// AUTH TABLES (Better Auth)
// ============================================================================

export const user = mysqlTable("user", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .$default(() => nanoid()),

  email: varchar("email", { length: 255 }).notNull().unique(),
  firstName: varchar("first_name", { length: 25 }).notNull(),
  lastName: varchar("last_name", { length: 25 }).notNull(),
  image: text("image"),

  emailVerified: boolean("email_verified").default(false).notNull(),

  role: mysqlEnum("role", roles).default("member").notNull(),
  banned: boolean("banned"),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires", { mode: "string" }),

  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .defaultNow()
    .onUpdateNow()
    .notNull(),
});

export const session = mysqlTable("session", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .$default(() => nanoid()),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  token: varchar("token", { length: 255 }).notNull().unique(),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),

  expiresAt: timestamp("expires_at", { mode: "string" }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .defaultNow()
    .onUpdateNow()
    .notNull(),
});

export const account = mysqlTable("account", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .$default(() => nanoid()),
  accountId: varchar("account_id", { length: 255 }).notNull(),
  providerId: varchar("provider_id", { length: 50 }).notNull(),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at", {
    mode: "string",
  }),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at", {
    mode: "string",
  }),
  scope: varchar("scope", { length: 500 }),
  password: varchar("password", { length: 255 }),

  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .defaultNow()
    .onUpdateNow()
    .notNull(),
});

export const verification = mysqlTable("verification", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .$default(() => nanoid()),
  identifier: varchar("identifier", { length: 255 }).notNull(),
  value: varchar("value", { length: 255 }).notNull(),

  expiresAt: timestamp("expires_at", { mode: "string" }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .defaultNow()
    .onUpdateNow()
    .notNull(),
});

// ============================================================================
// APPLICATION TABLES
// ============================================================================

export const profileTable = mysqlTable("profile", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .$default(() => nanoid()),
  userId: varchar("user_id", { length: 36 })
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),

  batting: mysqlEnum("batting", BATTING_ORIENTATION),
  throwing: mysqlEnum("throwing", THROWING_ORIENTATION),
  position: mysqlEnum("position", POSITIONS),

  school: varchar("school", { length: 100 }),
  bio: text("bio"),
  dateOfBirth: date("date_of_birth"),
  isActive: boolean("is_active").default(false).notNull(),
  phoneNumber: char("phone_number", { length: 16 }).unique(),

  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .defaultNow()
    .onUpdateNow()
    .notNull(),
});

export const userAddressTable = mysqlTable("user_address", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .$default(() => nanoid()),
  userId: varchar("user_id", { length: 36 })
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  profileId: varchar("profile_id", { length: 36 })
    .references(() => profileTable.id, { onDelete: "cascade" })
    .notNull(),

  street: varchar("street", { length: 100 }),
  city: varchar("city", { length: 50 }),
  state: varchar("state", { length: 20 }),
  zipCode: char("zip_code", { length: 5 }),

  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" })
    .defaultNow()
    .onUpdateNow()
    .notNull(),
});

// ============================================================================
// INDEXES
// ============================================================================

export const sessionIndexes = {
  userIdIdx: index("session_user_id_idx").on(session.userId),
  tokenIdx: index("session_token_idx").on(session.token),
};

export const accountIndexes = {
  userIdIdx: index("account_user_id_idx").on(account.userId),
  providerAccountIdx: index("account_provider_account_idx").on(
    account.providerId,
    account.accountId,
  ),
};

export const verificationIndexes = {
  identifierIdx: index("verification_identifier_idx").on(
    verification.identifier,
  ),
};

export const profileTableIndexes = {
  userIdIdx: index("profile_user_id_idx").on(profileTable.userId),
};

export const userAddressTableIndexes = {
  userIdIdx: index("user_address_user_id_idx").on(userAddressTable.userId),
  profileIdIdx: index("user_address_profile_id_idx").on(
    userAddressTable.profileId,
  ),
};
