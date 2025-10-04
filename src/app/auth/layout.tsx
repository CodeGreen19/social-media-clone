import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function layout({ children }: LayoutProps<"/auth">) {
  return (
    <div className="max-w-md m-auto">
      <nav className="h-20 items-center flex justify-start">
        <Link href={"/"}>
          <Button variant={"ghost"}>
            <ChevronLeft /> Home
          </Button>
        </Link>
      </nav>
      <div>{children}</div>
    </div>
  );
}
