import { z } from "zod";

export const addContactSchema = z.object({
  type: z.enum(["PHONE", "EMAIL", "VIBER", "TELEGRAM", "WHATSAPP", "FACEBOOK", "OTHER"], {
    required_error: "Будь ласка, оберіть тип контакту",
  }),
  content: z.string().min(1, { message: "Значення контакту не може бути порожнім" }),
})

export const editContactSchema = z.object({
  content: z.string().min(1, { message: "Значення контакту не може бути порожнім" }),
})

export type AddContactDto = z.infer<typeof addContactSchema>;
export type EditContactDto = z.infer<typeof editContactSchema>;
