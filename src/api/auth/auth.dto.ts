import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signUpSchema = signInSchema.extend({
  isLegal: z.boolean(),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;

export interface EmailResendRequest {
  email: string;
}

export interface TokenResponse {
  token: string;
}
