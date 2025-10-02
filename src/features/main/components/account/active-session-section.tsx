"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ActiveSessionsSection() {
  const sessions = [
    { id: 1, device: "Chrome - Windows", location: "Dhaka, Bangladesh" },
    { id: 2, device: "Safari - iPhone", location: "Chittagong, Bangladesh" },
  ];

  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle>Active Sessions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sessions.map((s) => (
          <div
            key={s.id}
            className="flex items-center justify-between border-b pb-2 last:border-none"
          >
            <div>
              <p className="text-sm font-medium">{s.device}</p>
              <p className="text-xs text-muted-foreground">{s.location}</p>
            </div>
            <Button variant="outline" size="sm">
              Logout
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
