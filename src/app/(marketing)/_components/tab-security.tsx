import React from "react";
import { SectionLayoutWrapper } from "./section-layout-wrapper";
import {
  SecurityUPdatePasswordForm,
  SecurityUPdatePasswordFormTrigger,
} from "./security-update-password-form";

export default function TabSecurity() {
  return (
    <SectionLayoutWrapper
      heading="Security"
      sections={[
        {
          title: "Update password",
          FormComponent: SecurityUPdatePasswordForm,
          TriggerComponent: SecurityUPdatePasswordFormTrigger,
        },
      ]}
    />
  );
}
