"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heart, HeartOff, MessageSquare, Trash2 } from "lucide-react";
import { useState } from "react";
export function PostCard({
  post,
}: {
  post: {
    id: string;
    title: string;
    description: string;
    authorid: string;
    createdAt: Date;
    comments: { id: string; author: string; content: string }[];
  };
}) {
  const [liked, setLiked] = useState(false);

  return (
    <Card className="w-full max-w-2xl bg-background border shadow-none">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{post.title}</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => alert(`Delete post: ${post.title}`)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          By {post.authorid} • {post.createdAt.toLocaleDateString()}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm">{post.description}</p>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLiked((prev) => !prev)}
            className="flex items-center gap-1"
          >
            {liked ? (
              <>
                <HeartOff className="w-4 h-4" /> Unlike
              </>
            ) : (
              <>
                <Heart className="w-4 h-4" /> Like
              </>
            )}
          </Button>

          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <MessageSquare className="w-4 h-4" /> Comment
          </Button>
        </div>

        <Separator />

        <div className="space-y-2">
          <h4 className="font-medium text-sm">Comments</h4>
          {post.comments.length === 0 ? (
            <p className="text-muted-foreground text-sm">No comments yet.</p>
          ) : (
            post.comments.map((comment) => (
              <div
                key={comment.id}
                className="border-l pl-3 text-sm text-muted-foreground"
              >
                <span className="font-medium">{comment.author}</span>:{" "}
                {comment.content}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
