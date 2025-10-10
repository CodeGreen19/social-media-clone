"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import React from "react";

export default function page() {
  const { isPending, data, mutate } = useMutation({
    mutationFn: async () =>
      await authClient.admin.impersonateUser({
        userId: "s7WdmDZuRe7CNZHS0tnpuHPJl0XKQegl",
      }),
  });

  console.log(data);

  return (
    <div>
      <Button disabled={isPending} onClick={() => mutate()}>
        impersonated by
      </Button>
    </div>
  );
}
