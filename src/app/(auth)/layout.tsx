import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function layout({ children }: LayoutProps<"/">) {
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
