"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
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
