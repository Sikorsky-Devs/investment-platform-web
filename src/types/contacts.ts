export type ContactsType =
  | "PHONE"
  | "EMAIL"
  | "VIBER"
  | "TELEGRAM"
  | "WHATSAPP"
  | "FACEBOOK"
  | "OTHER";

export interface Contact {
  id: string;
  userId: string;
  type: ContactsType;
  content: string;
}
