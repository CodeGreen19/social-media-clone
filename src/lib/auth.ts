import { db } from "@/drizzle/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { sendResetPassword, sendVerficationEmail } from "./send-email";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ url, user }) => {
      await sendResetPassword({ firstName: user.name, resetLink: url });
      console.log(url);
    },
    resetPasswordTokenExpiresIn: 300, // 5 min
  },
  emailVerification: {
    sendOnSignIn: true,
    sendOnSignUp: true,
    expiresIn: 1800, // 30 min
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendVerficationEmail({
        firstName: user.name,
        verifyLink: url,
      });
    },
  },
  session: {
    cookieCache: {
      enabled: true,
    },
  },
});
