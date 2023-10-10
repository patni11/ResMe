import { Sidebar } from "./Sidebar";
import {
  RegisterLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import UserAccountNav from "./UserBox/UserAccountNav";
import { Button } from "../ui/button";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarMain({}: SidebarProps) {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  return (
    <div>
      <Sidebar>
        {user && user.id ? (
          <UserAccountNav
            name={
              !user.given_name || !user.family_name
                ? "Your Account"
                : `${user.given_name} ${user.family_name}`
            }
            email={user.email ?? ""}
          />
        ) : (
          <div>
            <RegisterLink>
              <Button variant="default" className="w-full">
                Register
              </Button>
            </RegisterLink>
          </div>
        )}
      </Sidebar>
    </div>
  );
}
