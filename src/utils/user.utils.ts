import type { User } from "@/types/user";

export const getUserName = (
  name?: string | null,
  firstName?: string | null,
  lastName?: string | null,
) => {
  if (name) return name;
  if (firstName && lastName) return `${firstName} ${lastName}`;
  if (firstName && !lastName) return firstName;
};

export const getFullName = (
  firstName?: string | null,
  lastName?: string | null,
  middleName?: string | null,
  name?: string | null,
) => {
  if (name) return name;
  if (firstName && lastName && middleName) {
    return `${middleName} ${firstName} ${lastName}`;
  }
  if (firstName && lastName) return `${firstName} ${lastName}`;
  if (firstName && !lastName) return firstName;
  return "Не вказано";
};

export const getUserType = (user: User) => {
  if (user.isLegal) return "Юридична особа";
  return "Фізична особа";
};
