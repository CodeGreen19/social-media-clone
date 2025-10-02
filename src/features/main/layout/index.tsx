"use client";

import { ChildrenProp } from "@/lib/types";
import Navbar from "./navbar";
import { ProfileBoxOptions, SignOutBox } from "./profile-box";
import RightSection from "./right-section";

export default function MainLayout({ children }: ChildrenProp) {
  return (
    <div className="h-dvh overflow-y-auto">
      <Navbar />
      <div className="lg:hidden">
        <div className="p-4">{children}</div>
      </div>

      <div className=" max-w-7xl lg:grid grid-cols-[1fr_2fr_1fr] m-auto">
        <section className="border-l border-b p-4 sticky self-start top-16 h-fit">
          <ProfileBoxOptions />
          <SignOutBox />
        </section>
        <section className="border-x p-4">{children}</section>
        <section className="border-r border-b p-4 sticky self-start top-16">
          <RightSection />
        </section>
      </div>
    </div>
  );
}
