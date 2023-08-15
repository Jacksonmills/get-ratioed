import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseUrl() {
  if (process.env.NODE_ENV === "development") {
    return 'http://localhost:3000/api';
  }

  if (typeof window !== 'undefined') {
    const { protocol, host } = window.location;
    return `${protocol}//${host}/api`;
  }

  return process.env.NEXT_PUBLIC_API_BASE_URL;
}
