import { SidebarMain } from "@/components/Navigation/SideBarMain";
export const dynamic = "force-dynamic";
//import { Sidebar } from "@/components/Navigation/Sidebar";

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   redirect("/login");
  // } //TODO:Uncomment

  return (
    <div className="flex h-full w-full">
      {/* Added for demonstration purposes, adjust width and other styles as required */}
      <SidebarMain />
      <div className="flex-1">{children}</div>
    </div>
  );
}
