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
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import SocialLoginButtons from "./social-login-buttons";

const signinSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Password must be 6 or more character").max(100),
});
type SigninSchemaType = z.infer<typeof signinSchema>;

export default function SigninForm() {
  const router = useRouter();
  const form = useForm<SigninSchemaType>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (val: SigninSchemaType) => {
    const result = await authClient.signIn.email(val);
    if (result.data) {
      router.push("/");
    }
    if (result.error) {
      console.log(result.error);

      if (result.error.status === 403) {
        if (result.error.statusText) {
          return toast.error(result.error.message || result.error.statusText, {
            style: {
              backgroundColor: "#fba4a454",
              color: "red",
              border: "none",
            },
          });
        }
        form.reset();
        return toast.success("We have sent a verification email");
      }
      form.reset();
      toast.error(result.error.message ?? "Error Occures");
    }
  };

  const isPending = form.formState.isSubmitting;
  return (
    <div>
      <SocialLoginButtons />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
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
                <div className="flex items-center justify-between ">
                  <FormLabel>Password</FormLabel>
                  <h3 className="text-sm">
                    <Link
                      href={"/forgot-password"}
                      className="text-muted-foreground "
                    >
                      Forgot your password ?
                    </Link>
                  </h3>
                </div>
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
          Don&apos;t have a account ?{" "}
          <Link href={"/sign-up"} className="text-blue-500">
            Sign up
          </Link>
        </h1>
      </div>
    </div>
  );
}
