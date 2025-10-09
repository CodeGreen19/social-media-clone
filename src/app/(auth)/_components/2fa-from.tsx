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
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const twoFactorSchema = z.object({
  code: z.string().min(6, "code must be six degit"),
});
type TwoFactorSchemaType = z.infer<typeof twoFactorSchema>;

export default function TwoFactorForm() {
  const form = useForm<TwoFactorSchemaType>({
    resolver: zodResolver(twoFactorSchema),
    defaultValues: {
      code: "",
    },
  });

  const handleSubmit = async (val: TwoFactorSchemaType) => {
    const result = await authClient.twoFactor.verifyOtp({
      code: val.code,
    });
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
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>OTP Code</FormLabel>

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
    </div>
  );
}
