import { authOptions } from "@/lib/authOptions";
import NextAuth from "next-auth";
// export const maxDuration = 10;
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
