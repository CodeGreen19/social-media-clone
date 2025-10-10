"use client";

import { cn } from "@/lib/utils";
import { LucideIcon, Palette, Shield, User } from "lucide-react";
import { useState } from "react";
import TabPrefrence from "./tab-preference";
import TabProfile from "./tab-profile";
import TabSecurity from "./tab-security";

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
    Icon: Palette,
    text: "Preferance",
  },
];

export default function UserManagement() {
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
      <section className="bg-background grow rounded-lg p-6 overflow-y-auto">
        {tab === "Profile" ? (
          <TabProfile />
        ) : tab === "Security" ? (
          <TabSecurity />
        ) : tab === "Preferance" ? (
          <TabPrefrence />
        ) : null}
      </section>
    </div>
  );
}
