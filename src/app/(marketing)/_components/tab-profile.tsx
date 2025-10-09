import { ChangeEmailForm, ChangeEmailTrigger } from "./profile-change-email";
import ProfileConnectSocials from "./profile-connect-socials";
import {
  ProfileNameUpdateForm,
  ProfileNameUpdateTrigger,
} from "./profile-name-update-form";
import { SectionLayoutWrapper } from "./section-layout-wrapper";

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
        {
          title: "Change Email",
          FormComponent: ChangeEmailForm,
          TriggerComponent: ChangeEmailTrigger,
        },
      ]}
    />
  );
}
