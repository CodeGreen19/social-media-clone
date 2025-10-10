"use client";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import AddPost from "./posts/add-post";
import UserButton from "./user-button/user-button";

export function Navbar() {
  const { data, isPending } = authClient.useSession();

  return (
    <div className="border-b">
      <nav className="h-20 border-b flex items-center justify-between px-6 lg:px-0 max-w-2xl m-auto">
        <div className="flex items-center justify-center gap-2">
          <Logo className="size-10" />
          <h2 className="text-2xl font-bold">Glimps</h2>
        </div>
        {isPending ? (
          <div className="flex items-center justify-center gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-20" />
          </div>
        ) : (
          <div>
            {data ? (
              <div className="flex items-center justify-center gap-2">
                <UserButton dropDownAlign="end" />
                <AddPost />
              </div>
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
  );
}
