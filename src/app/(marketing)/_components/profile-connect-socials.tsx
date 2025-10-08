"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowRight, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Account } from "better-auth";

export default function ProfileConnectSocials() {
  const { data, isPending, error } = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const res = await authClient.listAccounts();
      if (res.error) {
        toast.error(res.error.message || res.error.statusText);
        return res.data;
      }
      return res.data;
    },
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Data is empty !</div>;
  }

  const nonCredentialsAccounts = data.filter(
    (account) => account.providerId !== "credential"
  );
  return (
    <div>
      {nonCredentialsAccounts.length === 0 ? (
        <div>No social accounts connected</div>
      ) : (
        nonCredentialsAccounts.map((account) => (
          <div key={account.id} className="flex items-center justify-between">
            <Badge>{account.providerId}</Badge>
            <DropDownAccountActions providerId={account.providerId} />
          </div>
        ))
      )}
      <AccountLinkedSection accounts={nonCredentialsAccounts} />
    </div>
  );
}
function AccountLinkedSection({
  accounts,
}: {
  accounts: Pick<Account, "providerId" | "accountId">[];
}) {
  const { mutate, isPending } = useMutation({
    mutationFn: (provider: string) => authClient.linkSocial({ provider }),
  });
  return (
    <div className="py-3 space-x-2">
      {accounts.find((account) => account.providerId === "google") ? null : (
        <Button
          onClick={() => mutate("google")}
          disabled={isPending}
          variant={"ghost"}
          className="text-blue-500"
        >
          Connect Google <ArrowRight />
        </Button>
      )}
      {accounts.find((account) => account.providerId === "github") ? null : (
        <Button
          onClick={() => mutate("github")}
          disabled={isPending}
          variant={"ghost"}
          className="text-blue-500"
        >
          Github Google <ArrowRight />
        </Button>
      )}
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
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
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
