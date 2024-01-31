import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  // if (typeof window !== "undefined") return path;
  if (process.env.VERCEL_URL) return `https://resme.xyz${path}`;
  return `https://localhost:${process.env.PORT ?? 3000}${path}`;
}

export function convertTimestampToDate(timestamp: number) {
  // Create a new date object from the timestamp
  var date = new Date(timestamp);

  // Define an array of month names
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Extract the month, day, and year from the date object
  var month = months[date.getMonth()];
  var day = date.getDate();
  var year = date.getFullYear();

  // Return the formatted date string
  return month + ", " + day + ", " + year;
}
