import { Sidebar } from "./Sidebar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserAccountNav from "./UserBox/UserAccountNav";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarMain({}: SidebarProps) {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  return (
    <div>
      <Sidebar>
        <UserAccountNav
          name={
            !user.given_name || !user.family_name
              ? "Your Account"
              : `${user.given_name} ${user.family_name}`
          }
          email={user.email ?? ""}
        />
      </Sidebar>
    </div>
  );
}
