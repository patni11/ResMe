import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LoginLink,
  RegisterLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = getKindeServerSession();

  return (
    <div className="flex h-full w-full">
      {" "}
      {/* Added for demonstration purposes, adjust width and other styles as required */}
      <Sidebar />
      {(await isAuthenticated()) ? (
        <div className="flex-1">{children}</div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <Card className="w-[30%]">
            <CardHeader>
              <CardTitle> Please Log In</CardTitle>
              <CardDescription>
                {" "}
                Please sign in or register to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
              <LoginLink>
                <Button variant="outline" className="w-full">
                  {" "}
                  Sign In
                </Button>
              </LoginLink>

              <RegisterLink>
                <Button variant="default" className="w-full">
                  {" "}
                  Register
                </Button>
              </RegisterLink>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
