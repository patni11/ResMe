import { Sidebar } from "./Sidebar";
// import {
//   RegisterLink,
//   getKindeServerSession,
// } from "@kinde-oss/kinde-auth-nextjs/server";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}
import { UserBoxPage } from "./UserBox/UserBoxPage";

export async function SidebarMain({}: SidebarProps) {
  // const { getUser } = getKindeServerSession();
  // const user = getUser();
  return (
    <div>
      <Sidebar>
        <UserBoxPage />
      </Sidebar>
    </div>
  );
}
