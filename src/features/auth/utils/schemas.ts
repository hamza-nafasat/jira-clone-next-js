import { z } from "zod";

const loginSchema = z.object({
  email: z.string().trim().email({ message: "Enter a valid email" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const signUpSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  email: z.string().trim().email({ message: "Enter a valid email" }),
  password: z.string().min(8, { message: "Password is at least 8 characters" }),
});

export { loginSchema, signUpSchema };
