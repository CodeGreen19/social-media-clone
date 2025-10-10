"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { User } from "better-auth";
import { Dispatch, SetStateAction, useState } from "react";
import UserManagement from "./user-management";
import { useRouter } from "next/navigation";

export default function UserButton({
  dropDownAlign,
}: {
  dropDownAlign?: "start" | "center" | "end";
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data, isPending } = authClient.useSession();

  if (isPending) {
    return <Spinner />;
  }
  if (!data) {
    return null;
  }
  return (
    <div>
      <Dialog>
        <ProfileButtonTriggerBox
          open={dropdownOpen}
          setOpen={setDropdownOpen}
          user={data.user}
          dropDownAlign={dropDownAlign}
        />
        <DialogTitle className="sr-only" />
        <DialogContent className="h-[95vh] p-0 overflow-hidden !max-w-[calc(100%-2rem)] md:!max-w-4xl  bg-card ">
          <UserManagement />
        </DialogContent>
      </Dialog>
    </div>
  );
}

// trigger dropdown
type ProfileButtonTriggerBox = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  user: User;
  dropDownAlign?: "start" | "center" | "end";
};
function ProfileButtonTriggerBox({
  open,
  setOpen,
  user,
  dropDownAlign,
}: ProfileButtonTriggerBox) {
  const router = useRouter();
  const { mutate, isPending: logoutPending } = useMutation({
    mutationFn: () => authClient.signOut(),
    onSuccess: () => {
      router.refresh();
    },
  });
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={user.image ?? ""} />
          <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={dropDownAlign ?? "center"}
        className="p-4 space-y-2"
      >
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={user.image ?? ""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h1 className="font-medium text-accent-foreground">{user.name}</h1>
            <h2 className="text-muted-foreground text-sm">{user.email}</h2>
          </div>
        </div>
        <Separator />
        <div className="flex gap-2">
          <DialogTrigger asChild onClick={() => setOpen(false)}>
            <Button variant={"outline"}>Manage account</Button>
          </DialogTrigger>

          <Button
            disabled={logoutPending}
            onClick={() => mutate()}
            variant={"outline"}
            className="text-red-500"
          >
            Logout
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
