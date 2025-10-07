import React from "react";
import { SectionLayoutWrapper } from "./section-layout-wrapper";
import {
  SecurityUPdatePasswordForm,
  SecurityUPdatePasswordFormTrigger,
} from "./security-update-password-form";
import { SecurityActiveDevices } from "./security-active-devices";

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
        {
          title: "Active devices",
          NormalComponent: SecurityActiveDevices,
        },
      ]}
    />
  );
}
