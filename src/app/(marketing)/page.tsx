import { db } from "@/drizzle/db";
import { PostCard } from "./_components/post-card";
import { posts } from "@/drizzle/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";
import StopImpersonating from "./_components/stop-impersonating-button";

// PostCard Component

export default async function Page() {
  const authSession = await auth.api.getSession({ headers: await headers() });
  const allPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.authorid, authSession?.user.id || ""));

  return (
    <div className="flex flex-col items-center py-10 px-4 space-y-6">
      {allPosts.length === 0 ? (
        <p className="text-muted-foreground text-sm">No posts available yet.</p>
      ) : (
        allPosts.map((post) => (
          <PostCard key={post.id} post={{ ...post, comments: [] }} />
        ))
      )}
      <Link href={"/dashboard"}>
        <Button
          variant={"outline"}
          className="fixed text-blue-500 bottom-4 right-4"
        >
          <LayoutDashboard />
        </Button>
      </Link>
      {authSession?.session.impersonatedBy && <StopImpersonating />}
    </div>
  );
}
