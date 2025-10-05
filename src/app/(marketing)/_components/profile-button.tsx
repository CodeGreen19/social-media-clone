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
import { useState } from "react";
import ManageProfile from "./manage-profile";

export default function ProfileButton() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data, isPending } = authClient.useSession();
  const { mutate, isPending: logoutPending } = useMutation({
    mutationFn: () => authClient.signOut(),
  });
  if (isPending) {
    return <Spinner />;
  }
  if (!data) {
    return null;
  }
  return (
    <div>
      <Dialog>
        <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src={data.user.image ?? ""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={data.user.image ?? ""} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <h1 className="font-medium text-accent-foreground">
                  {data.user.name}
                </h1>
                <h2 className="text-muted-foreground text-sm">
                  {data.user.email}
                </h2>
              </div>
            </div>
            <Separator />
            <div className="flex gap-2">
              <DialogTrigger asChild onClick={() => setDropdownOpen(false)}>
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
        <DialogTitle className="sr-only" />
        {/* dialouge content */}
        <DialogContent className="h-[95vh] p-0 overflow-hidden !max-w-[calc(100%-2rem)] md:!max-w-4xl overflow-y-auto bg-card">
          <ManageProfile />
        </DialogContent>
      </Dialog>
    </div>
  );
}
