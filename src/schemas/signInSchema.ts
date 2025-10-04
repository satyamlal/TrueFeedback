import { z } from "zod";

export const signInSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(3, "Please enter your username or email.")
    .max(254, "Identifier is too long."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(30, "Password is too long."),
});

export type SignInInput = z.infer<typeof signInSchema>;
