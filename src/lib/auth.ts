import { db } from "@/drizzle/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {
  sendChangeEmail,
  sendOTPVerficationEmail,
  sendResetPassword,
  sendVerficationEmail,
} from "./send-email";
import { twoFactor, admin as adminPlugin } from "better-auth/plugins";
import { admin, user, ac, moderator } from "@/lib/permissions";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  appName: "Glimps",
  plugins: [
    twoFactor({
      skipVerificationOnEnable: true,
      otpOptions: {
        async sendOTP({ user, otp }) {
          await sendOTPVerficationEmail({ firstName: user.name, otp });
        },
      },
    }),
    adminPlugin({
      ac,
      roles: {
        admin,
        user,
        moderator,
      },
    }),
  ],

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGlE_CLIENT_SECRET as string,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
    },
  },
  user: {
    changeEmail: {
      enabled: true,
      async sendChangeEmailVerification(data) {
        await sendChangeEmail({
          firstName: data.user.name,
          newEmail: data.newEmail,
          url: data.url,
        });
      },
    },
  },
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
