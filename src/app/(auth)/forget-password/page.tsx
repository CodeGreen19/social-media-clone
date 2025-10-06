"use client";
import React from "react";
import AuthCardWrapper from "../_components/auth-card-wrapper";
import ForgetPasswordForm from "../_components/forget-password-form";

export default function page() {
  return (
    <AuthCardWrapper title="Forget Password">
      <ForgetPasswordForm />
    </AuthCardWrapper>
  );
}
