import React from "react";
import { SectionLayoutWrapper } from "./section-layout-wrapper";
import {
  SecurityUPdatePasswordForm,
  SecurityUPdatePasswordFormTrigger,
} from "./security-update-password-form";
import { SecurityActiveDevices } from "./security-active-devices";
import {
  Security2FaTriggers,
  SecurityEnableDisable2FAForm,
} from "./security-2fa";

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
          title: "2FA",
          FormComponent: SecurityEnableDisable2FAForm,
          TriggerComponent: Security2FaTriggers,
        },
        {
          title: "Active devices",
          NormalComponent: SecurityActiveDevices,
        },
      ]}
    />
  );
}
