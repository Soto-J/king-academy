import { createAccessControl } from "better-auth/plugins/access";

export const statement = {
  profile: ["create", "share", "update", "delete"],
} as const;

export const ac = createAccessControl(statement);

export const admin = ac.newRole({
  profile: ["create", "share", "update", "delete"],
});

export const user = ac.newRole({
  profile: ["create", "update"],
});
