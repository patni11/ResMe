import { SidebarMain } from "@/components/Navigation/SideBarMain";
//import { Sidebar } from "@/components/Navigation/Sidebar";

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { isAuthenticated } = getKindeServerSession();
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  // if (!isAuthenticated){
  //   redirect('/auth-callback?origin=dashboard')
  // }

  // return (
  //   <div className="absolute flex flex-col space-y-4 h-full w-full items-center justify-center">
  //     <h1 className="text-xl font-light">
  //       We are making changes. App will be live on 6 Nov
  //     </h1>
  //     <h2>
  //       Follow for updates:{" "}
  //       <a href="https://twitter.com/resmexyz" className="font-bold">
  //         @resmexyz
  //       </a>
  //     </h2>
  //   </div>
  // );

  return (
    <div className="flex h-full w-full">
      {" "}
      {/* Added for demonstration purposes, adjust width and other styles as required */}
      <SidebarMain />
      <div className="flex-1">{children}</div>
    </div>
  );
}
