import { InferSelectModel } from "drizzle-orm";

import {
  user,
  session,
  account,
  profileTable,
  positionTable,
  battingStanceTable,
  throwingArmTable,
  addressTable,
} from "./schema";

export type UserTable = InferSelectModel<typeof user>;
export type SessionTable = InferSelectModel<typeof session>;
export type AccountTable = InferSelectModel<typeof account>;
export type ProfileTable = InferSelectModel<typeof profileTable>;
export type PositionTableTable = InferSelectModel<typeof positionTable>;
export type BattingStanceTable = InferSelectModel<typeof battingStanceTable>;
export type ThrowingArmTable = InferSelectModel<typeof throwingArmTable>;
export type AddressTable = InferSelectModel<typeof addressTable>;
