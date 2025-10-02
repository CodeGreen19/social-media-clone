import MainLayout from "@/features/main/layout";
import React from "react";

export default function layout({ children }: LayoutProps<"/">) {
  return <MainLayout>{children}</MainLayout>;
}
