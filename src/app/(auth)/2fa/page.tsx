import React from "react";
import AuthCardWrapper from "../_components/auth-card-wrapper";
import TwoFactorForm from "../_components/2fa-from";

export default function page() {
  return (
    <AuthCardWrapper title="Forget Password">
      <TwoFactorForm />
    </AuthCardWrapper>
  );
}
