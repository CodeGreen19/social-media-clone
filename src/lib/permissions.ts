import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";
const statement = {
  ...defaultStatements,
  post: ["create", "delete", "update", "share"],
} as const;

export const ac = createAccessControl(statement);

export const user = ac.newRole({
  post: ["create"],
});

export const admin = ac.newRole({
  post: ["create", "delete"],
  ...adminAc.statements,
});
export const moderator = ac.newRole({
  post: ["update", "share"],
});
