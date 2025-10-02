import { z } from "zod";

// --- Common Fields ---

const passwordSchema = z
  .string()
  .min(6, { message: "Password must be at least 6 characters long" })
  .max(100, { message: "Password cannot exceed 100 characters" });

const emailSchema = z.email({ message: "Invalid email address" });

// --- Login Schema ---

export const signinSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// --- Signup Schema ---

export const signupSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name cannot exceed 50 characters" }),

  email: emailSchema,
  password: passwordSchema,
});

export type SignupSchemaType = z.infer<typeof signupSchema>;
export type SignupSchemaShape = typeof signupSchema.shape;
export type SigninSchemaType = z.infer<typeof signinSchema>;
export type SigninSchemaShape = typeof signinSchema.shape;
