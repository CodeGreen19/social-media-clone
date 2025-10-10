"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { StopCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function StopImpersonating() {
  const router = useRouter();
  return (
    <div className="fixed bottom-14 right-4">
      <Button
        onClick={() =>
          authClient.admin.stopImpersonating(undefined, {
            onSuccess: () => router.refresh(),
          })
        }
      >
        <StopCircle />
      </Button>
    </div>
  );
}
