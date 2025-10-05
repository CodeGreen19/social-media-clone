import React from "react";
import AuthCardWrapper from "../_components/auth-card-wrapper";
import SignupForm from "../_components/signup-form";

export default function page() {
  return (
    <AuthCardWrapper title="Sign up">
      <SignupForm />
    </AuthCardWrapper>
  );
}
