import { nanoid } from "nanoid";

import {
  mysqlTable,
  varchar,
  text,
  time,
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

export const ROLES = ["admin", "user"] as const;

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

  role: mysqlEnum("role", ROLES).default("user").notNull(),
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
  id: varchar("id", { length: 21 })
    .primaryKey()
    .$default(() => nanoid())
    .notNull(),
  userId: varchar("user_id", { length: 36 })
    .references(() => user.id, { onDelete: "cascade" })
    .unique()
    .notNull(),

  school: varchar("school", { length: 100 }),
  bio: text("bio"),
  dateOfBirth: date("date_of_birth"),
  isActive: boolean("is_active").default(false).notNull(),
  phoneNumber: char("phone_number", { length: 16 }).unique(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const baseballProfileTable = mysqlTable("baseball_profile", {
  id: varchar("id", { length: 21 })
    .primaryKey()
    .$default(() => nanoid())
    .notNull(),
  profileId: varchar("profile_id", { length: 21 })
    .references(() => profileTable.id, { onDelete: "cascade" })
    .unique()
    .notNull(),

  battingStance: mysqlEnum(BATTING_STANCE),
  throwingArm: mysqlEnum(THROWING_ARM),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const positionTable = mysqlTable("position", {
  id: varchar("id", { length: 21 })
    .primaryKey()
    .$default(() => nanoid())
    .notNull(),
  baseballProfileId: varchar("baseball_profile_id", { length: 21 })
    .references(() => baseballProfileTable.id, { onDelete: "cascade" })
    .notNull(),

  position: mysqlEnum("position", POSITIONS).notNull(),
  isPrimary: boolean("is_primary").default(false).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const addressTable = mysqlTable("address", {
  id: varchar("id", { length: 21 })
    .primaryKey()
    .$default(() => nanoid())
    .notNull(),
  userId: varchar("user_id", { length: 36 })
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  profileId: varchar("profile_id", { length: 21 })
    .references(() => profileTable.id, { onDelete: "cascade" })
    .unique()
    .notNull(),

  street: varchar("street", { length: 20 }),
  city: varchar("city", { length: 20 }),
  state: char("state", { length: 2 }),
  zipCode: char("zip_code", { length: 5 }),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

// ============================================================================
// SCHEDULE
// ============================================================================

export const scheduleTable = mysqlTable("schedule", {
  id: varchar("id", { length: 21 })
    .primaryKey()
    .$default(() => nanoid())
    .notNull(),

  gameNumber: int("game_number").unique().notNull(),
  division: varchar("division", { length: 20 }).notNull(),

  homeTeam: varchar("home_team", { length: 20 }).notNull(),
  visitingTeam: varchar("visiting_team", { length: 20 }).notNull(),

  location: varchar("location", { length: 20 }).notNull(),

  date: timestamp("date").notNull(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

// ============================================================================
// IMAGES
// ============================================================================
export const galleryImageTable = mysqlTable("gallery_image", {
  id: varchar("id", { length: 21 })
    .primaryKey()
    .$default(() => nanoid())
    .notNull(),
  publicId: varchar("public_id", { length: 255 }).unique().notNull(),

  width: int("width").notNull(),
  height: int("height").notNull(),

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

export const addressTableIndexes = {
  userIdIdx: index("user_address_user_id_idx").on(addressTable.userId),
  profileIdIdx: index("user_address_profile_id_idx").on(addressTable.profileId),
};
