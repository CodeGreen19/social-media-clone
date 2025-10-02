"use client";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ChildrenProp } from "@/lib/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function AuthLayout({ children }: ChildrenProp) {
  const pathname = usePathname();
  return (
    <div className=" max-w-md m-auto mt-20 px-4 space-y-3">
      <div>
        <Logo className="size-10" />
      </div>
      <div className="space-x-1">
        <Link href={"/sign-in"}>
          <Button variant={pathname === "/sign-in" ? "default" : "outline"}>
            Sign In
          </Button>
        </Link>
        <Link href={"/sign-up"}>
          <Button variant={pathname === "/sign-up" ? "default" : "outline"}>
            Sign In
          </Button>
        </Link>
      </div>
      <div>{children}</div>
    </div>
  );
}
