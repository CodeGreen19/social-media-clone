"use client";

import { CustomFormField } from "@/components/shared-form/custom-form-filed";
import { CustomFormWrapper } from "@/components/shared-form/custom-form-wrapper";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signinSchema, SigninSchemaShape, SigninSchemaType } from "../schema";

export default function SignInForm() {
  const form = useForm<SigninSchemaType>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <CustomFormWrapper<SigninSchemaShape> form={form} onSubmit={(val) => {}}>
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
      <div className="flex justify-end">
        <Button className="">Submit</Button>
      </div>
    </CustomFormWrapper>
  );
}
