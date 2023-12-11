"use server";
import { getServerSession } from "next-auth/next";
import authOptions, { Session } from "@/lib/authOptions";
//import { FetchError } from "../types";
export async function getUserEmailFromSession(): Promise<string> {
  const session: Session | null = await getServerSession(authOptions);
  if (
    session == undefined ||
    session.user == undefined ||
    session.user.email == undefined
  ) {
    throw new Error("User not logged in");
  }
  return session.user.email;
}
