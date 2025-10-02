import React from "react";
import { UpdateInfoSection } from "../components/account/update-info-section";
import { ChangePasswordSection } from "../components/account/change-password";
import { ProfileSection } from "../components/account/profile-section";
import { ActiveSessionsSection } from "../components/account/active-session-section";

export default function AccountPage() {
  return (
    <div>
      <UpdateInfoSection />
      <ChangePasswordSection />
      <ProfileSection />
      <ActiveSessionsSection />
    </div>
  );
}
