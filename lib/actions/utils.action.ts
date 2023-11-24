"use server";
import { getServerSession } from "next-auth/next";
import authOptions, { Session } from "@/lib/authOptions";
export async function getUserEmailFromSession() {
  const session: Session | null = await getServerSession(authOptions);
  if (
    session == undefined ||
    session.user == undefined ||
    session.user.email == undefined
  ) {
    throw new Error("User not found");
  }
  return session.user.email;
}
