"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ProfileConnectSocials() {
  const { data: result } = useQuery({
    queryKey: ["accounts"],
    queryFn: () => authClient.listAccounts(),
  });

  return (
    <div>
      {result?.data?.map((account) => (
        <div key={account.id} className="flex items-center justify-between">
          <Badge>{account.providerId}</Badge>
          <DropDownAccountActions providerId={account.providerId} />
        </div>
      ))}
      <AccountLinkedSection />
    </div>
  );
}
function AccountLinkedSection() {
  const { mutate } = useMutation({
    mutationFn: (provider: string) => authClient.linkSocial({ provider }),
  });
  return (
    <div className="p-8 border flex items-center justify-center gap-2">
      link{" "}
      <span onClick={() => mutate("google")} className="text-blue-500">
        Google
      </span>{" "}
      or{" "}
      <span onClick={() => mutate("github")} className="text-blue-500">
        Github
      </span>
    </div>
  );
}

function DropDownAccountActions({ providerId }: { providerId: string }) {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: () => authClient.unlinkAccount({ providerId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"}>
          <MoreHorizontal />{" "}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={isPending}
          onClick={() => mutate()}
          variant="destructive"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
