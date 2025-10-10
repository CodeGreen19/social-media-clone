"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export function ChangeEmailVerfication() {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();
  const searchParam = useSearchParams();
  const isTokenVerficationError =
    searchParam.get("error") === "token_expired" ||
    searchParam.get("error") === "invalid_token";

  const user = data?.user;

  const mutation = useMutation({
    mutationFn: () =>
      authClient.sendVerificationEmail({
        email: user?.email || "",
      }),
    onSuccess: ({ data }) => {
      if (data?.status) {
        toast.info("a verification link has sent to your email");
      }
    },
  });

  useEffect(() => {
    if (isTokenVerficationError) {
      setTimeout(() => {
        toast.error("Your email verification token is expired or invalid");
        router.push("/");
      }, 0);
    }
  }, [isTokenVerficationError, router]);

  if (!user || user.emailVerified) {
    return null;
  }

  return (
    <div className=" border-b text-yellow-500 py-1 flex items-center justify-center gap-2">
      New email not verified{" "}
      <Button
        disabled={isPending}
        onClick={() => mutation.mutate()}
        variant={"outline"}
        className="text-yellow-500"
      >
        Verify
      </Button>
    </div>
  );
}
