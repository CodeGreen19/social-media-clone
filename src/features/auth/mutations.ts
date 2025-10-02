import { useMutation } from "@tanstack/react-query";
import { SigninSchemaType, SignupSchemaType } from "./schema";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export const authMutations = {
  signup: () =>
    useMutation({
      mutationFn: async (input: SignupSchemaType) => {
        const res = await authClient.signUp.email(input);
        if (res.data) {
          return true;
        }
        if (res.error) {
          toast.error(res.error.message ?? res.error.statusText);
          return false;
        }
      },
    }),
  signin: () =>
    useMutation({
      mutationFn: async (input: SigninSchemaType) => {
        const res = await authClient.signIn.email(input);
        if (res.data) {
          return true;
        }
        if (res.error) {
          toast.error(res.error.message ?? res.error.statusText);
          return false;
        }
      },
    }),
};
