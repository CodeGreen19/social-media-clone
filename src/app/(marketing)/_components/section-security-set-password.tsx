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
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { authClient } from "@/lib/auth-client";
import {
  AccountSectionTriggers,
  ActionButtons,
} from "./section-action-wrapper";
import { useRouter } from "next/navigation";

//
// 🔒 Zod schema
//
const passwordSchema = z
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

type PasswordSchemaType = z.infer<typeof passwordSchema>;

//
// 🔧 Form Section
//
function SectionPasswordUpdateForm({ onClose }: AccountSectionTriggers) {
  const router = useRouter();
  const form = useForm<PasswordSchemaType>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
      logoutAll: false,
    },
  });

  const isPending = form.formState.isSubmitting;

  const handleSubmit = async (values: PasswordSchemaType) => {
    try {
      // 🔐 Update password through your auth client (customize this)
      const result = await authClient.changePassword({
        currentPassword: "passcode",
        newPassword: values.newPassword,
        revokeOtherSessions: values.logoutAll,
      });

      if (result.data) {
        toast.success("Password updated successfully");
        if (values.logoutAll) {
          toast.info("Logged out from all other devices");
        }
        router.refresh();
      }

      if (result.error) {
        toast.error(result.error.message ?? "Error updating password");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter new password"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="text"
                  placeholder="Re-enter new password"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="logoutAll"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-2">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <div className="space-y-1 leading-none">
                  <FormLabel>Log out from all other devices</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <ActionButtons
            isPending={isPending}
            onClose={onClose}
            buttonText="Update Password"
            buttonType="submit"
          />
        </form>
      </Form>
    </div>
  );
}

//
// 🧩 Trigger Section
//
function SectionPasswordUpdateTrigger({ onOpen }: AccountSectionTriggers) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">
          Change your account password
        </p>
      </div>
      <Button onClick={onOpen} variant={"ghost"} className="text-blue-500">
        Update
      </Button>
    </div>
  );
}

export { SectionPasswordUpdateForm, SectionPasswordUpdateTrigger };
