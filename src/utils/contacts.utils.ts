import {
  Facebook,
  Globe,
  Mail,
  MessageCircle,
  MessageSquare,
  Phone,
  Send,
} from "lucide-react";

import type { ContactsType } from "@/types/contacts";

const PLACEHOLDERS_MAP: Record<ContactsType, string> = {
  PHONE: "+380501234567",
  EMAIL: "example@email.com",
  VIBER: "+380501234567",
  TELEGRAM: "@username",
  WHATSAPP: "+380501234567",
  FACEBOOK: "username або посилання",
  OTHER: "Введіть значення контакту",
};

export const getPlaceholder = (type: ContactsType | undefined) => {
  if (!type) return "Введіть значення контакту";
  return PLACEHOLDERS_MAP[type];
};

export const contactIconMap = {
  PHONE: Phone,
  EMAIL: Mail,
  VIBER: MessageCircle,
  TELEGRAM: Send,
  WHATSAPP: MessageSquare,
  FACEBOOK: Facebook,
  OTHER: Globe,
} as const;
