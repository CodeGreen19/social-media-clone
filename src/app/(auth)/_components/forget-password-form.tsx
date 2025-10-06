"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const forgetPasswordSchema = z.object({
  email: z.email(),
});
type ForgetPasswordSchemaType = z.infer<typeof forgetPasswordSchema>;

export default function ForgetPasswordForm() {
  const form = useForm<ForgetPasswordSchemaType>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (val: ForgetPasswordSchemaType) => {
    const result = await authClient.forgetPassword({
      email: val.email,
      redirectTo: "/reset-password",
    });
    console.log(result);

    if (result.data?.status) {
      const info = result.data as { status: boolean; message?: string };

      toast.info(
        info.message || "A email varification link has sent to your email"
      );

      form.reset();
    }
    if (result.error) {
      toast.error(result.error.message ?? "Error Occures");
    }
  };

  const isPending = form.formState.isSubmitting;
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormDescription>
                  Enter you email address to get password reset link.
                </FormDescription>
                <Input
                  placeholder="eg:email@gmail.com"
                  {...field}
                  type="text"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" disabled={isPending}>
            Submit
          </Button>
        </form>
      </Form>
      <div className="my-3 text-sm text-muted-foreground">
        <h1>
          Back to{" "}
          <Link href={"/sign-in"} className="text-blue-500">
            Sign in
          </Link>
        </h1>
      </div>
    </div>
  );
}
