import * as React from "react";

type WelcomeEmailType = {
  firstName: string;
};

function WelcomeEmail({ firstName }: WelcomeEmailType) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9fafb",
        padding: "24px",
        color: "#111827",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          padding: "32px",
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ fontSize: "20px", marginBottom: "16px" }}>
          Welcome to Our Community, {firstName}! 🎉
        </h1>
        <p style={{ fontSize: "16px", lineHeight: "24px" }}>
          We're thrilled to have you join us. You’ve successfully created your
          account, and you’re all set to start exploring our platform.
        </p>
        <p style={{ marginTop: "16px", fontSize: "16px" }}>
          If you have any questions, feel free to reach out anytime — we’re here
          to help!
        </p>
        <p style={{ marginTop: "24px", color: "#6b7280", fontSize: "14px" }}>
          Cheers, <br /> The Support Team
        </p>
      </div>
    </div>
  );
}

type ChangeEmailNotificationType = {
  firstName: string;
  newEmail: string;
  url: string;
};

function ChangeEmailNotification({
  firstName,
  newEmail,
  url,
}: ChangeEmailNotificationType) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9fafb",
        padding: "24px",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          padding: "32px",
          maxWidth: "500px",
          margin: "0 auto",
          color: "#111827",
        }}
      >
        <h1 style={{ fontSize: "20px", marginBottom: "16px" }}>
          Your Email Address Has Been Updated
        </h1>

        <p style={{ fontSize: "16px", lineHeight: "24px" }}>
          Hi {firstName}, <br />
          We wanted to let you know that your email has been successfully
          changed to <strong>{newEmail}</strong>.
        </p>
        <a
          href={url}
          style={{
            display: "inline-block",
            marginTop: "16px",
            padding: "12px 20px",
            backgroundColor: "#16a34a",
            color: "#ffffff",
            borderRadius: "6px",
            textDecoration: "none",
          }}
        >
          Verify its you
        </a>
        <p style={{ marginTop: "16px", fontSize: "16px" }}>
          If you didn’t make this change, please contact our support team
          immediately to secure your account.
        </p>
        <p style={{ marginTop: "24px", color: "#6b7280", fontSize: "14px" }}>
          Best regards, <br /> The Security Team
        </p>
      </div>
    </div>
  );
}

type ResetPasswordEmailType = {
  firstName: string;
  resetLink: string;
};

function ResetPasswordEmail({ firstName, resetLink }: ResetPasswordEmailType) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9fafb",
        padding: "24px",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          padding: "32px",
          maxWidth: "500px",
          margin: "0 auto",
          color: "#111827",
        }}
      >
        <h1 style={{ fontSize: "20px", marginBottom: "16px" }}>
          Reset Your Password
        </h1>
        <p style={{ fontSize: "16px", lineHeight: "24px" }}>
          Hi {firstName}, <br />
          We received a request to reset your password. You can change it by
          clicking the button below:
        </p>
        <a
          href={resetLink}
          style={{
            display: "inline-block",
            marginTop: "16px",
            padding: "12px 20px",
            backgroundColor: "#2563eb",
            color: "#ffffff",
            borderRadius: "6px",
            textDecoration: "none",
          }}
        >
          Reset Password
        </a>
        <p style={{ marginTop: "16px", fontSize: "14px", color: "#6b7280" }}>
          If you didn’t request this, you can safely ignore this email. This
          link will expire in 5 min.
        </p>
        <p style={{ marginTop: "24px", color: "#6b7280", fontSize: "14px" }}>
          Thanks, <br /> The Support Team
        </p>
      </div>
    </div>
  );
}

type EmailVerificationEmailType = {
  firstName: string;
  verifyLink: string;
};

function EmailVerificationEmail({
  firstName,
  verifyLink,
}: EmailVerificationEmailType) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9fafb",
        padding: "24px",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          padding: "32px",
          maxWidth: "500px",
          margin: "0 auto",
          color: "#111827",
        }}
      >
        <h1 style={{ fontSize: "20px", marginBottom: "16px" }}>
          Verify Your Email Address
        </h1>
        <p style={{ fontSize: "16px", lineHeight: "24px" }}>
          Hi {firstName}, <br />
          Please confirm your email address by clicking the button below. This
          helps us keep your account secure.
        </p>
        <a
          href={verifyLink}
          style={{
            display: "inline-block",
            marginTop: "16px",
            padding: "12px 20px",
            backgroundColor: "#16a34a",
            color: "#ffffff",
            borderRadius: "6px",
            textDecoration: "none",
          }}
        >
          Verify Email
        </a>
        <p style={{ marginTop: "16px", fontSize: "14px", color: "#6b7280" }}>
          This link will expire in 30 minutes. If you didn’t create an account,
          you can ignore this email.
        </p>
        <p style={{ marginTop: "24px", color: "#6b7280", fontSize: "14px" }}>
          Thanks, <br /> The Verification Team
        </p>
      </div>
    </div>
  );
}
type OTPVerificationType = {
  otp: string;
  firstName: string;
};

function OTPVerificationEmail({ otp, firstName }: OTPVerificationType) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9fafb",
        padding: "24px",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          padding: "32px",
          maxWidth: "500px",
          margin: "0 auto",
          color: "#111827",
        }}
      >
        <h1 style={{ fontSize: "20px", marginBottom: "16px" }}>
          2FA verfication
        </h1>
        <p style={{ fontSize: "16px", lineHeight: "24px" }}>
          Hi {firstName}, <br />
          Please confirm your email address by clicking the button below. This
          helps us keep your account secure.
        </p>
        <a
          style={{
            display: "inline-block",
            marginTop: "16px",
            padding: "12px 20px",
            color: "#ffffff",
            borderRadius: "6px",
            textDecoration: "none",
          }}
        >
          {otp}
        </a>
        <p style={{ marginTop: "16px", fontSize: "14px", color: "#6b7280" }}>
          This OTP will expire in 30 minutes. If you didn’t create an account,
          you can ignore this email.
        </p>
        <p style={{ marginTop: "24px", color: "#6b7280", fontSize: "14px" }}>
          Thanks, <br /> The Verification Team
        </p>
      </div>
    </div>
  );
}

export {
  ResetPasswordEmail,
  EmailVerificationEmail,
  ChangeEmailNotification,
  WelcomeEmail,
  OTPVerificationEmail,
  type EmailVerificationEmailType,
  type ResetPasswordEmailType,
  type ChangeEmailNotificationType,
  type WelcomeEmailType,
  type OTPVerificationType,
};
