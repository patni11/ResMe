import { Sidebar } from "./Sidebar";
// import {
//   RegisterLink,
//   getKindeServerSession,
// } from "@kinde-oss/kinde-auth-nextjs/server";
import UserAccountNav from "./UserBox/UserAccountNav";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarMain({}: SidebarProps) {
  // const { getUser } = getKindeServerSession();
  // const user = getUser();

  return (
    <div>
      <Sidebar>
        <UserAccountNav />
      </Sidebar>
    </div>
  );
}
