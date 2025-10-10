"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

export default function page() {
  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      // const res = await authClient.admin.hasPermission({
      //   permissions: {
      //     post: ["share"],
      //   },
      //   role: "admin",
      //   userId: "s7WdmDZuRe7CNZHS0tnpuHPJl0XKQegl",
      // });

      const hasPermission = authClient.admin.checkRolePermission({
        role: "moderator",
        permissions: {
          post: ["share"],
        },
      });

      if (hasPermission) {
        return toast.success("User has permission");
      } else {
        return toast.error("You don't have any permission");
      }
    },
  });
  return (
    <div>
      <Button disabled={isPending} onClick={() => mutate()}>
        Has permissions
      </Button>
    </div>
  );
}
