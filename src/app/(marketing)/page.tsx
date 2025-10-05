"use client";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import ProfileButton from "./_components/profile-button";
import { useMutation } from "@tanstack/react-query";

export default function page() {
  const { data, isPending } = authClient.useSession();

  const { mutate, isPending: logoutPending } = useMutation({
    mutationFn: () => authClient.signOut(),
  });
  return (
    <div>
      <div className="border-b">
        <nav className="h-20 border-b flex items-center justify-between px-6 lg:px-0 max-w-2xl m-auto">
          <Logo className="size-10" />
          {isPending ? (
            <Skeleton className="h-10 w-20" />
          ) : (
            <div>
              {data ? (
                <Button
                  variant={"destructive"}
                  disabled={logoutPending}
                  onClick={() => mutate()}
                >
                  Logout
                </Button>
              ) : (
                <div>
                  <Link href={"/sign-in"}>
                    <Button>Sign in</Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
      <h1 className="text-2xl font-bold text-center mt-6">
        Complete Better Auth Demo
      </h1>
      <div className="flex items-center justify-center mt-6">
        <ProfileButton />
      </div>
    </div>
  );
}
