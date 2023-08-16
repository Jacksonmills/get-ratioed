import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}



export function calculateWinner(
  tweetLikeCount: number,
  quotedLikeCount: number
): boolean {
  return tweetLikeCount > quotedLikeCount;
}
