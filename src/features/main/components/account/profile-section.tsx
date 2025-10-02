"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export function ProfileSection() {
  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <Image
          src="/placeholder.png"
          alt="User Avatar"
          width={64}
          height={64}
          className="border"
        />
        <Button variant="outline">Update</Button>
      </CardContent>
    </Card>
  );
}
