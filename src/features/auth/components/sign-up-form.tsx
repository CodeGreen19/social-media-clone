"use client";

import { CustomFormWrapper } from "@/components/shared-form/custom-form-wrapper";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupSchemaShape, SignupSchemaType } from "../schema";
import { CustomFormField } from "@/components/shared-form/custom-form-filed";
import { Button } from "@/components/ui/button";
import { authMutations } from "../mutations";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const router = useRouter();
  const { mutate, isPending } = authMutations.signup();
  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  return (
    <CustomFormWrapper<SignupSchemaShape>
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
      <CustomFormField<SignupSchemaShape>
        form={form}
        input="text"
        name="name"
        placeHolder="Name"
        required
      />
      <CustomFormField<SignupSchemaShape>
        form={form}
        input="email"
        name="email"
        placeHolder="Email"
        required
      />
      <CustomFormField<SignupSchemaShape>
        form={form}
        input="text"
        name="password"
        placeHolder="Password"
        required
      />

      <Button disabled={isPending}>Submit</Button>
    </CustomFormWrapper>
  );
}
