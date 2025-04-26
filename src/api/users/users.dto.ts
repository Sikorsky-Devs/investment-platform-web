import { z } from "zod";

export const updateUserSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  isLegal: z.boolean().optional(),
  isApproved: z.boolean().optional(),
  currentPassword: z.string().optional(),
  newPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .optional()
    .or(z.literal("")),
});

export type UserUpdateDto = z.infer<typeof updateUserSchema>;
