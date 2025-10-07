import React from "react";
import { SectionLayoutWrapper } from "./section-layout-wrapper";
import {
  ProfileNameUpdateForm,
  ProfileNameUpdateTrigger,
} from "./profile-name-update-form";
import ProfileConnectSocials from "./profile-connect-socials";

export default function TabProfile() {
  return (
    <SectionLayoutWrapper
      heading="Profile setttings"
      sections={[
        {
          title: "Profile",
          FormComponent: ProfileNameUpdateForm,
          TriggerComponent: ProfileNameUpdateTrigger,
        },
        {
          title: "Connect accounts",
          NormalComponent: ProfileConnectSocials,
        },
      ]}
    />
  );
}
