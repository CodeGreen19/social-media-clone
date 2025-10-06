"use client";
import AuthCardWrapper from "../_components/auth-card-wrapper";
import ResetPasswordForm from "../_components/reset-password-form";

export default function page() {
  return (
    <AuthCardWrapper title="Reset Password">
      <ResetPasswordForm />
    </AuthCardWrapper>
  );
}
