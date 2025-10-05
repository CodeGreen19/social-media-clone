import React from "react";
import { SectionActionWrapper } from "./section-action-wrapper";
import {
  SectionPasswordUpdateForm,
  SectionPasswordUpdateTrigger,
} from "./section-security-set-password";

export default function SectionSecurity() {
  return (
    <SectionActionWrapper
      heading="Security"
      sections={[
        {
          title: "Password",
          FormComponent: SectionPasswordUpdateForm,
          TriggerComponent: SectionPasswordUpdateTrigger,
        },
      ]}
    />
  );
}
