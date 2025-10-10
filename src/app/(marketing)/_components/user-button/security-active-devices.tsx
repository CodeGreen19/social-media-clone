import { authClient } from "@/lib/auth-client";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Session } from "better-auth";
import { Monitor, Smartphone } from "lucide-react";
import { UAParser } from "ua-parser-js";

export function SecurityActiveDevices() {
  const { data: sessionData } = authClient.useSession();
  const { data, error, isPending } = useQuery({
    queryKey: ["session-lists"],
    queryFn: async () => {
      const res = await authClient.listSessions();
      return res.data;
    },
  });

  if (isPending) return <div>pending...</div>;
  if (error) return <div>error occurs</div>;
  return data ? (
    <div>
      <SessionManagement
        currentSessionToken={sessionData?.session.token ?? ""}
        sessions={data}
      />
    </div>
  ) : (
    <div></div>
  );
}

export function SessionManagement({
  sessions,
  currentSessionToken,
}: {
  sessions: Session[];
  currentSessionToken: string;
}) {
  const queryClient = useQueryClient();

  const otherSessions = sessions.filter((s) => s.token !== currentSessionToken);
  const currentSession = sessions.find((s) => s.token === currentSessionToken);

  function revokeOtherSessions() {
    return authClient.revokeOtherSessions(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["session-lists"] });
      },
    });
  }

  return (
    <div className="space-y-3">
      {currentSession && (
        <SessionCard session={currentSession} isCurrentSession />
      )}

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="">Other Active Sessions</h3>
          {otherSessions.length > 0 && (
            <div>
              <Button
                onClick={revokeOtherSessions}
                variant={"ghost"}
                className="text-red-500"
              >
                Revoke all other sessions
              </Button>
            </div>
          )}
        </div>

        {otherSessions.length === 0 ? (
          <Card className="bg-background">
            <CardContent className="py-8 text-center text-muted-foreground">
              No other active sessions
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {otherSessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SessionCard({
  session,
  isCurrentSession = false,
}: {
  session: Session;
  isCurrentSession?: boolean;
}) {
  const queryClient = useQueryClient();
  const userAgentInfo = session.userAgent ? UAParser(session.userAgent) : null;

  function getBrowserInformation() {
    if (userAgentInfo == null) return "Unknown Device";
    if (userAgentInfo.browser.name == null && userAgentInfo.os.name == null) {
      return "Unknown Device";
    }

    if (userAgentInfo.browser.name == null) return userAgentInfo.os.name;
    if (userAgentInfo.os.name == null) return userAgentInfo.browser.name;

    return `${userAgentInfo.browser.name}, ${userAgentInfo.os.name}`;
  }

  function formatDate(date: Date) {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  }

  function revokeSession() {
    return authClient.revokeSession(
      {
        token: session.token,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["session-lists"] });
        },
      }
    );
  }

  return (
    <Card className="shadow-none bg-background">
      <CardHeader className="flex justify-between">
        <CardTitle>{getBrowserInformation()}</CardTitle>
        {isCurrentSession && <Badge>Current Session</Badge>}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {userAgentInfo?.device.type === "mobile" ? (
              <Smartphone />
            ) : (
              <Monitor />
            )}
            <div>
              <p className="text-sm text-muted-foreground">
                Created: {formatDate(session.createdAt)}
              </p>
              <p className="text-sm text-muted-foreground">
                Expires: {formatDate(session.expiresAt)}
              </p>
            </div>
          </div>
          {!isCurrentSession && (
            <div>
              <Button
                onClick={revokeSession}
                variant={"ghost"}
                className="text-yellow-500"
              >
                Revoke
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
