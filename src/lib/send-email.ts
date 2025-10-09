"use server";

import "dotenv";

import {
  ChangeEmailNotification,
  ChangeEmailNotificationType,
  EmailVerificationEmail,
  EmailVerificationEmailType,
  OTPVerificationEmail,
  OTPVerificationType,
  ResetPasswordEmail,
  ResetPasswordEmailType,
  WelcomeEmail,
  WelcomeEmailType,
} from "@/components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerficationEmail = async (
  input: EmailVerificationEmailType
) => {
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["codegreen19s@gmail.com"],
    subject: "Verify your email",
    react: EmailVerificationEmail(input),
  });
  if (error) {
    return { success: false };
  }
  if (data) {
    return { success: true };
  }
};
export const sendWelcomeEmail = async (input: WelcomeEmailType) => {
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["codegreen19s@gmail.com"],
    subject: "Welcome",
    react: WelcomeEmail(input),
  });
  if (error) {
    return { success: false };
  }
  if (data) {
    return { success: true };
  }
};
export const sendChangeEmail = async (input: ChangeEmailNotificationType) => {
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["codegreen19s@gmail.com"],
    subject: "Change email address",
    react: ChangeEmailNotification(input),
  });
  if (error) {
    return { success: false };
  }
  if (data) {
    return { success: true };
  }
};

export const sendResetPassword = async (input: ResetPasswordEmailType) => {
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["codegreen19s@gmail.com"],
    subject: "Reset your password",
    react: ResetPasswordEmail(input),
  });
  if (error) {
    return { success: false };
  }
  if (data) {
    return { success: true };
  }
};
export const sendOTPVerficationEmail = async (input: OTPVerificationType) => {
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["codegreen19s@gmail.com"],
    subject: "OTP Verfication",
    react: OTPVerificationEmail(input),
  });
  if (error) {
    return { success: false };
  }
  if (data) {
    return { success: true };
  }
};
