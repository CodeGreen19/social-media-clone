import Image from "next/image";
import React from "react";
import logo from "../../public/logo.png";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href={"/"}>
      <Image
        src={logo}
        alt="Logo"
        className={cn("size-6 dark:invert-100", className)}
      />
    </Link>
  );
}
