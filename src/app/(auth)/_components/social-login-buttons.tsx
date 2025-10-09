"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";

export default function SocialLoginButtons() {
  return (
    <div className="space-y-3 mb-5">
      <div className="grid grid-cols-2 gap-1.5">
        <Button
          onClick={() => authClient.signIn.social({ provider: "google" })}
          type="button"
          variant={"outline"}
        >
          Google
        </Button>
        <Button
          onClick={() => authClient.signIn.social({ provider: "github" })}
          type="button"
          variant={"outline"}
        >
          Github
        </Button>
      </div>
      <Separator />
    </div>
  );
}
