import UserAccountNav from "./UserAccountNav";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth/next";
export async function UserBoxPage() {
  // const { getUser } = getKindeServerSession();
  // const user = getUser();
  const session = await getServerSession(authOptions);

  return (
    <UserAccountNav
      email={session?.user?.email || ""}
      name={session?.user?.name || ""}
    />
  );
}
