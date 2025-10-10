import { twoFactorClient, adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { admin, user, ac, moderator } from "@/lib/permissions";

export const authClient = createAuthClient({
  plugins: [
    twoFactorClient({
      onTwoFactorRedirect() {
        window.location.href = "/2fa"; // Handle the 2FA verification redirect
      },
    }),
    adminClient({
      ac,
      roles: {
        admin,
        user,
        moderator,
      },
    }),
  ],
});
