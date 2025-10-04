import { z } from "zod/v4";

export const usernameValidation = z
  .string()
  .min(5, "Username must be atleast 5 characters!")
  .max(254, "Username can't exceed 20 characters!")
  .regex(/^[a-zA-Z0-9._-]+$/, "Username must not contain special characters!");

export const SignUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ error: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
