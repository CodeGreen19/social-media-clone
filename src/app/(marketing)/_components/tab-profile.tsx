import React from "react";
import { SectionLayoutWrapper } from "./section-layout-wrapper";
import {
  ProfileNameUpdateForm,
  ProfileNameUpdateTrigger,
} from "./profile-name-update-form";

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
      ]}
    />
  );
}
