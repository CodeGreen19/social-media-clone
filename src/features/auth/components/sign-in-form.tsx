"use client";

import { CustomFormField } from "@/components/shared-form/custom-form-filed";
import { CustomFormWrapper } from "@/components/shared-form/custom-form-wrapper";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { authMutations } from "../mutations";
import { signinSchema, SigninSchemaShape, SigninSchemaType } from "../schema";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const router = useRouter();
  const { mutate, isPending } = authMutations.signin();
  const form = useForm<SigninSchemaType>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <CustomFormWrapper<SigninSchemaShape>
      form={form}
      onSubmit={(input) =>
        mutate(input, {
          onSuccess: (data) => {
            if (data) {
              router.push("/");
            }
          },
        })
      }
    >
      <CustomFormField<SigninSchemaShape>
        form={form}
        input="email"
        name="email"
        placeHolder="Email"
        required
      />
      <CustomFormField<SigninSchemaShape>
        form={form}
        input="text"
        name="password"
        placeHolder="Password"
        required
      />

      <Button disabled={isPending} type="submit">
        Submit
      </Button>
    </CustomFormWrapper>
  );
}
