import { SectionActionWrapper } from "./section-action-wrapper";
import {
  SectionProfileUpdateForm,
  SectionProfileUpdateTrigger,
} from "./section-profile-update";

export default function SectionProfile() {
  return (
    <div>
      <SectionActionWrapper
        heading="Profile settings"
        sections={[
          {
            title: "Profile",
            FormComponent: SectionProfileUpdateForm,
            TriggerComponent: SectionProfileUpdateTrigger,
          },
        ]}
      />
    </div>
  );
}
