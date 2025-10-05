import { Button } from "@/components/ui/button";
import React from "react";
import { Separator } from "@/components/ui/separator";

export default function SocialIconSection() {
  return (
    <div className="space-y-3 mb-5">
      <div className="grid grid-cols-2 gap-1.5">
        <Button type="button" variant={"outline"}>
          Google
        </Button>
        <Button type="button" variant={"outline"}>
          Github
        </Button>
      </div>
      <Separator />
    </div>
  );
}
