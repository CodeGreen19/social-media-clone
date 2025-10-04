"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email(),
  password: z.string().min(6, "Password must be 6 or more character").max(100),
});
type SignupSchemaType = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const router = useRouter();
  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const handleSubmit = async (val: SignupSchemaType) => {
    const result = await authClient.signUp.email(val);
    if (result.data) {
      router.push("/");
    }
    if (result.error) {
      toast.error(result.error.message ?? "Error Occures");
    }
  };

  const isPending = form.formState.isSubmitting;
  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <Input placeholder="eg: Ahemd dev" {...field} type="text" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <Input
                    placeholder="eg: email@gmail.com"
                    {...field}
                    type="text"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password *</FormLabel>
                  <Input placeholder="******" {...field} type="text" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isPending}>Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
