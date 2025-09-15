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
  int,
} from "drizzle-orm/mysql-core";

// ============================================================================
// CONSTANTS & ENUMS
// ============================================================================

export const roles = ["admin", "user"] as const;

export const BATTING_STANCE = ["right", "left", "switch"] as const;
export const THROWING_ARM = BATTING_STANCE;
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
  id: varchar("id", { length: 36 }).primaryKey(),

  name: varchar("name", { length: 50 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  image: text("image"),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),

  role: mysqlEnum("role", roles).default("user").notNull(),
  banned: boolean("banned"),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").onUpdateNow().notNull(),
});

export const session = mysqlTable("session", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  token: varchar("token", { length: 255 }).notNull().unique(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),

  impersonatedBy: text("impersonated_by"),

  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const account = mysqlTable("account", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .$default(() => nanoid()),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  scope: varchar("scope", { length: 500 }),
  password: varchar("password", { length: 255 }),
  idToken: text("id_token"),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),

  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = mysqlTable("verification", {
  id: varchar("id", { length: 36 }).primaryKey(),

  identifier: varchar("identifier", { length: 255 }).notNull(),
  value: varchar("value", { length: 255 }).notNull(),

  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").onUpdateNow().notNull(),
});

// ============================================================================
// APPLICATION TABLES
// ============================================================================

export const profileTable = mysqlTable("profile", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .$default(() => nanoid())
    .notNull(),
  userId: varchar("user_id", { length: 36 })
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),

  school: varchar("school", { length: 100 }),
  bio: text("bio"),
  dateOfBirth: date("date_of_birth"),
  isActive: boolean("is_active").default(false).notNull(),
  phoneNumber: char("phone_number", { length: 16 }).unique(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const positionTable = mysqlTable("position", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .$default(() => nanoid())
    .notNull(),
  profileId: varchar("profile_id", { length: 36 })
    .references(() => profileTable.id, { onDelete: "cascade" })
    .notNull(),

  position: mysqlEnum("position", POSITIONS).notNull(),
  isPrimary: boolean("is_primary").default(false).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const battingStanceTable = mysqlTable("batting_stance", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .$default(() => nanoid())
    .notNull(),
  profileId: varchar("profile_id", { length: 36 })
    .references(() => profileTable.id, { onDelete: "cascade" })
    .notNull(),

  stance: mysqlEnum("position", BATTING_STANCE).notNull(),
  isPrimary: boolean("is_primary").default(false).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const throwingArmTable = mysqlTable("throwing_arm", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .$default(() => nanoid())
    .notNull(),
  profileId: varchar("profile_id", { length: 36 })
    .references(() => profileTable.id, { onDelete: "cascade" })
    .notNull(),

  batting: mysqlEnum("position", THROWING_ARM).notNull(),
  isPrimary: boolean("is_primary").default(false).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const userAddressTable = mysqlTable("user_address", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .$default(() => nanoid())
    .notNull(),
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

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

// ============================================================================
// SCHEDULE
// ============================================================================

export const scheduleTable = mysqlTable("schedule", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .$default(() => nanoid())
    .notNull(),

  gameNumber: int("game_number"),
  division: varchar("division", { length: 20 }),

  homeTeam: varchar("home_team", { length: 20 }),
  visitingTeam: varchar("visiting_team", { length: 20 }),

  location: varchar("location", { length: 20 }),

  date: timestamp().defaultNow().onUpdateNow().notNull(),
  endTime: timestamp().defaultNow().onUpdateNow().notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
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
