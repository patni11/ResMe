import { authOptions } from "@/lib/authOptions";
import NextAuth from "next-auth";
export const maxDuration = 30;

export const runtime = "edge";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
