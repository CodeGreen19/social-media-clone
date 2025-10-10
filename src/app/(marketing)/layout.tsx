import React from "react";
import { Navbar } from "./_components/navbar";
import { ChangeEmailVerfication } from "./_components/change-email-verification";

export default function layout({ children }: LayoutProps<"/">) {
  return (
    <div>
      <Navbar />
      <ChangeEmailVerfication />
      {children}
    </div>
  );
}
