import React, { useState } from "react";
import {
  AccountSectionTriggers,
  SectionActionButtons,
} from "./section-layout-wrapper";
import { Button } from "@/components/ui/button";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const enableDisable2faSchema = z.object({
  password: z.string().min(6, "password must be 6 char"),
});
type EnableDisable2FaSchema = z.infer<typeof enableDisable2faSchema>;

function SecurityEnableDisable2FAForm(triggers: AccountSectionTriggers) {
  const { data } = authClient.useSession();

  const form = useForm<EnableDisable2FaSchema>({
    resolver: zodResolver(enableDisable2faSchema),
    defaultValues: {
      password: "",
    },
  });

  const handleSubmit = async (val: EnableDisable2FaSchema) => {
    if (data?.user.twoFactorEnabled) {
      const result = await authClient.twoFactor.disable({
        password: val.password,
      });
      if (result.error) {
        toast.error(result.error.message || result.error.statusText);
      }
      if (result.data) {
        toast.message("two factor disabled");
        if (triggers.onClose) {
          triggers.onClose();
        }
      }
    } else {
      const result = await authClient.twoFactor.enable({
        password: val.password,
      });
      if (result.error) {
        toast.error(result.error.message || result.error.statusText);
      }
      if (result.data) {
        toast.message("two factor enabled");
        if (triggers.onClose) {
          triggers.onClose();
        }
      }
    }
  };

  const isPending = form.formState.isSubmitting;
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <Input placeholder="******" {...field} type="text" />
                <FormMessage />
              </FormItem>
            )}
          />
          <SectionActionButtons
            isPending={isPending}
            onClose={triggers.onClose}
            buttonText="Submit"
            buttonType="submit"
          />
        </form>
      </Form>
    </div>
  );
}

function Security2FaTriggers({ onOpen }: AccountSectionTriggers) {
  const { data } = authClient.useSession();
  return (
    <div className="py-3 flex items-center justify-between">
      <h2>Two Factor Authentication </h2>
      {data?.user.twoFactorEnabled ? (
        <Button onClick={onOpen} variant={"ghost"} className="text-red-500">
          Disable
        </Button>
      ) : (
        <Button onClick={onOpen} variant={"ghost"} className="text-blue-500">
          Enable
        </Button>
      )}
    </div>
  );
}

export { SecurityEnableDisable2FAForm, Security2FaTriggers };
