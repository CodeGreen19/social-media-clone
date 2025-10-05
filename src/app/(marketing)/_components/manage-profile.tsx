"use client";

import { cn } from "@/lib/utils";
import { LucideIcon, Shield, Thermometer, User } from "lucide-react";
import { useState } from "react";
import SectionPreferance from "./section-preferance";
import SectionProfile from "./section-profile";
import SectionSecurity from "./section-security";

type TabType = "Profile" | "Security" | "Preferance";
type AccountManageListType = {
  text: TabType;
  Icon: LucideIcon;
};
const manageLists: AccountManageListType[] = [
  {
    Icon: User,
    text: "Profile",
  },
  {
    Icon: Shield,
    text: "Security",
  },
  {
    Icon: Thermometer,
    text: "Preferance",
  },
];

export default function ManageProfile() {
  const [tab, setTab] = useState<TabType>("Profile");
  return (
    <div className="flex flex-col md:flex-row">
      <section className="w-[220px] space-y-4 shrink-0 p-6">
        <div className="">
          <h1 className="text-xl font-semibold">Account</h1>
          <p className="text-muted-foreground text-xs">
            Manage your account info.
          </p>
        </div>
        <div className="flex flex-row gap-1 md:flex-col md:gap-0">
          {manageLists.map((item) => (
            <div
              onClick={() => setTab(item.text)}
              className={cn(
                "w-full flex items-center gap-1 justify-start p-2 rounded-lg hover:text-accent-foreground text-muted-foreground",
                tab === item.text && "bg-accent text-accent-foreground"
              )}
              key={item.text}
            >
              {<item.Icon className="size-4" />} <span>{item.text}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-background grow rounded-lg p-6">
        {tab === "Profile" ? (
          <SectionProfile />
        ) : tab === "Security" ? (
          <SectionSecurity />
        ) : (
          <SectionPreferance />
        )}
      </section>
    </div>
  );
}
