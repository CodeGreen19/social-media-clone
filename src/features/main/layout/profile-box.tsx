"use client";

import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import UserAvater from "@/components/user-avater";
import { authClient } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";

function ProfileAvaterSheet() {
  return (
    <Sheet>
      <SheetTrigger>
        <UserAvater />
      </SheetTrigger>
      <SheetContent className="p-4">
        <SheetHeader className="p-0">
          <SheetTitle className="p-0">User</SheetTitle>
        </SheetHeader>
        <ProfileBoxOptions />
        <SignOutBox />
      </SheetContent>
    </Sheet>
  );
}

function ProfileBoxOptions() {
  return (
    <Command>
      <CommandGroup className="p-0 rounded-none py-2">
        <Link href={"/account"}>
          <CommandItem>Accounts</CommandItem>
        </Link>
        <Link href={"/profile"}>
          <CommandItem>Profile</CommandItem>
        </Link>
        <CommandItem className="p-0">
          <Button className="w-full">Create Post</Button>
        </CommandItem>
      </CommandGroup>
    </Command>
  );
}

function SignOutBox() {
  const router = useRouter();
  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      const res = await authClient.signOut();
      if (res.data) {
        router.push("/sign-in");
      }
    },
  });
  return (
    <Button
      disabled={isPending}
      onClick={() => mutate()}
      variant={"outline"}
      className="text-red-500 w-full"
    >
      Sign Out
    </Button>
  );
}

export { SignOutBox, ProfileBoxOptions, ProfileAvaterSheet };
