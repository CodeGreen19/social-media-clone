import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  AccountSectionTriggers,
  ActionButtons,
  SectionActionWrapper,
} from "./section-action-wrapper";

export default function SectionPreferance() {
  return (
    <SectionActionWrapper
      heading="Preference"
      sections={[
        {
          title: "Themes",
          TriggerComponent: SectionThemeUpdateTrigger,
          FormComponent: SectionThemeUpdateForm,
        },
      ]}
    />
  );
}

function SectionThemeUpdateForm({ onClose }: AccountSectionTriggers) {
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme ?? "system");

  // ensure selectedTheme syncs with current theme
  useEffect(() => {
    setSelectedTheme(theme ?? "system");
  }, [theme]);

  const handleSubmit = async () => {
    setTheme(selectedTheme);
  };

  const isPending = false;

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <Label className="text-sm font-medium">Choose your theme</Label>
        <RadioGroup
          value={selectedTheme}
          onValueChange={setSelectedTheme}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="light" id="light" />
            <Label htmlFor="light">Light</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dark" id="dark" />
            <Label htmlFor="dark">Dark</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="system" id="system" />
            <Label htmlFor="system">System</Label>
          </div>
        </RadioGroup>
      </div>

      <ActionButtons
        isPending={isPending}
        onClose={onClose}
        buttonText="Save"
        buttonType="button"
        buttonSubmit={handleSubmit}
      />
    </div>
  );
}

function SectionThemeUpdateTrigger({ onOpen }: AccountSectionTriggers) {
  const { theme } = useTheme();

  const themeLabel = `${theme?.charAt(0).toUpperCase()}${theme?.slice(1)}`;
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">
          Current theme: {themeLabel ?? "System"}
        </p>
      </div>
      <Button onClick={onOpen} variant={"ghost"} className="text-blue-500">
        Change
      </Button>
    </div>
  );
}

export { SectionThemeUpdateForm, SectionThemeUpdateTrigger };
