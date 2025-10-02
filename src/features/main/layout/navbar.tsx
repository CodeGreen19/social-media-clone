import Logo from "@/components/logo";
import React from "react";
import { ProfileAvaterSheet } from "./profile-box";
import ThemeSwitch from "./theme-switch";

export default function Navbar() {
  return (
    <div className=" border-b z-20 sticky bg-background top-0 left-0">
      <div className="h-12 max-w-7xl m-auto   md:h-16 flex items-center justify-between px-4 xl:px-0">
        <Logo className="size-8" />
        <div className="flex items-center gap-2">
          <div>
            <ThemeSwitch />
          </div>
          <div className="lg:hidden">
            <ProfileAvaterSheet />
          </div>
        </div>
      </div>
    </div>
  );
}
