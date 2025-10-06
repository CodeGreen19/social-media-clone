"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
    logoutAll: z.boolean().optional(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm() {
  const token = useSearchParams().get("token");
  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (val: ResetPasswordSchemaType) => {
    const result = await authClient.resetPassword({
      newPassword: val.newPassword,
      token: token ?? "",
    });
    if (result.data) {
      toast.success("Password updated");
    }
    if (result.error) {
      toast.error(result.error.message ?? "Error Occures");
    }
    form.reset();
  };

  const isPending = form.formState.isSubmitting;
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <Input placeholder="******" {...field} type="text" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>

                <Input placeholder="******" {...field} type="text" />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" disabled={isPending}>
            Submit
          </Button>
        </form>
      </Form>
      <div>
        <h1 className="my-3 text-sm text-muted-foreground">
          Back to{" "}
          <Link href={"/sign-in"} className="text-blue-500">
            Sign in
          </Link>
        </h1>
      </div>
    </div>
  );
}
