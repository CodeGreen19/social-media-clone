import React from "react";
import AuthCardWrapper from "../_components/auth-card-wrapper";
import SigninForm from "../_components/signin-form";

export default function page() {
  return (
    <AuthCardWrapper title="Sign In">
      <SigninForm />
    </AuthCardWrapper>
  );
}
