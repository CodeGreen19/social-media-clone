"use server";

import { AddPostSchema } from "@/app/(marketing)/_components/posts/add-post";
import { db } from "@/drizzle/db";
import { posts } from "@/drizzle/schema";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function createPost({ input }: { input: AddPostSchema }) {
  const user = (await auth.api.getSession({ headers: await headers() }))?.user;

  if (!user) {
    redirect("/sign-in");
  }
  await db.insert(posts).values({ authorid: user.id, ...input });

  revalidatePath("/");
  return { message: "new post created" };
}
