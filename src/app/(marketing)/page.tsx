"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React from "react";

export default function Home() {
  const { data, isPending, error } = authClient.useSession();

  if (isPending) {
    return "pending...";
  }
  if (error) {
    return "error occurs";
  }
  return (
    <div className="gap-6 mt-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold text-center">
        Complete Auth Using Better-Auth
      </h1>
      {data ? (
        <div className="space-x-2">
          <Link href={"/profile"}>
            <Button variant={"default"}>Profile</Button>
          </Link>
          <Link href={"/auth/signin"}>
            <Button variant={"destructive"}>Logout</Button>
          </Link>
        </div>
      ) : (
        <div>
          <Link href={"/auth/signin"}>
            <Button>Sign In</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
