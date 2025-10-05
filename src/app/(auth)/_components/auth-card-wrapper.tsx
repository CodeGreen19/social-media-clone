import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { ReactNode } from "react";

export default function AuthCardWrapper({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Card className="max-w-sm m-auto mt-4">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
