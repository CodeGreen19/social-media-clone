import Image from "next/image";
import React from "react";
import logo from "../../public/logo.png";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <Image src={logo} alt="Logo" className={cn("size-6", className)}></Image>
  );
}
