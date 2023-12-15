import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  // if (typeof window !== "undefined") return path;
  if (process.env.VERCEL_URL) return `https://resme.xyz${path}`; //TODO:change to correct url
  return `https://localhost:${process.env.PORT ?? 3000}${path}`;
}
