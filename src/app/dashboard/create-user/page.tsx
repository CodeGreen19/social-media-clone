"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import React from "react";

export default function page() {
  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      const record: Record<string, any> = {
        info: "additional info given",
      };
      const data = await authClient.admin.createUser({
        email: "email@gmail.com",
        name: "altaf",
        password: "passcode",
        role: "user",
        data: record,
      });

      console.log("test1->", data);
    },
  });
  return (
    <div>
      <Button disabled={isPending} onClick={() => mutate()}>
        Create User
      </Button>
    </div>
  );
}
