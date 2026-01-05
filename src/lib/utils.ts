import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPhoneNumber = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 10);

  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;

  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

export const formatDate = (date: string | Date | null) => {
  if (!date) return "Not specified";
  return format(new Date(date), "MMMM d, yyyy");
};

export const formatPositionLabel = (position: string | null) => {
  return position
    ? position
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "not specified";
};

export const formatStanceLabel = (stance: string | null) => {
  return stance
    ? stance.charAt(0).toUpperCase() + stance.slice(1)
    : "not specified";
};
