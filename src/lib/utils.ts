import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getErrorMessage = (error: unknown, defaultMessage: string) => {
  console.log(error);
  if (error instanceof Error) return error.message;
  return defaultMessage;
};
