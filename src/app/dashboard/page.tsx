"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const { data, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const data = await authClient.admin.listUsers({ query: {} });
      if (data.error) {
        return null;
      }
      if (!data.data.users) {
        return null;
      }
      return data.data.users;
    },
  });

  if (isPending) {
    return "is-pending...";
  }
  if (!data) {
    return "Don't have any data!";
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold mb-6">Users</h1>
        <div className="space-x-2">
          <Link href={"/dashboard/permissions"}>
            <Button>Permission</Button>
          </Link>
          <Link href={"/dashboard/update"}>
            <Button>Update</Button>
          </Link>
          <Link href={"/dashboard/create-user"}>
            <Button>Create</Button>
          </Link>
        </div>
      </div>

      <div className="border rounded-none">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-medium">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-sm text-muted-foreground py-6"
                >
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              data.map((u) => (
                <TableRow key={u.id} className="hover:bg-transparent">
                  <TableCell>{u.name || "—"}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <Badge>{u.emailVerified ? "✅" : "❌"}</Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(u.createdAt).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
