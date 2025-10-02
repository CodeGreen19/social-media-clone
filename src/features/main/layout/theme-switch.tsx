"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <Button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="rounded-full size-8 md:size-9"
        variant={"outline"}
      >
        {theme === "light" ? <Moon /> : <Sun />}
      </Button>
    </div>
  );
}
