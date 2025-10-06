import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { ChevronLeft } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function layout({ children }: LayoutProps<"/">) {
  const res = await auth.api.getSession({ headers: await headers() });

  if (res?.session) {
    redirect("/");
  }
  return (
    <div>
      <div className="border-b">
        <nav className="h-20 border-b flex items-center justify-start px-6 lg:px-0 max-w-2xl m-auto">
          <Link href={"/"}>
            <Button variant={"outline"}>
              <ChevronLeft /> Back
            </Button>
          </Link>
        </nav>
      </div>
      <div className="max-w-md m-auto ">{children}</div>
    </div>
  );
}
