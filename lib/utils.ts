import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseUrl() {
  return process.env.NODE_ENV === "development" ? 'http://localhost:3000/api' : process.env.NEXT_PUBLIC_API_BASE_URL;
}
