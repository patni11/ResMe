import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Session, getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import { deleteUser, fetchUser } from "@/lib/actions/user.actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DeleteButton, LogOut } from "./signOutButtons";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Profile - ResMe",
  description: "Your Profile",
  verification: {
    google: "google-site-verification=G-501H6DW77H",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
  },
};

const Profile = async () => {
  const session: Session | null = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.email) {
    throw new Error("User not found");
  }

  const user = await fetchUser();

  const handleDelete = async () => {
    "use server";
    await deleteUser(user.email);
  };

  return (
    <main className="flex w-full h-full items-center justify-center px-8">
      <Card className="w-[100%] mt-24 md:w-[50%] max-w-[450px] my-auto">
        <CardHeader>
          <CardTitle>{session.user.name || "Your Account"} </CardTitle>
          <CardDescription>{user.email || ""}</CardDescription>
        </CardHeader>

        <Separator className="mb-6" />

        <CardContent className="flex flex-col space-y-8 justify-center">
          <h1
            className={`${buttonVariants({
              variant: "outline",
            })} w-full flex justify-between`}
          >
            <span>Resumes Created</span>{" "}
            <span className="font-semibold">10</span>
          </h1>

          <h1
            className={`${buttonVariants({
              variant: "outline",
            })} w-full flex justify-between`}
          >
            <span>Subscription Plan:</span>{" "}
            <span className="font-semibold">Newbie</span>
          </h1>

          <Button
            variant="outline"
            className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
          >
            Upgrade
          </Button>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Dialog>
            <DialogTrigger className="px-2 py-1.5 text-sm  transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
              <Button
                variant="outline"
                className="bg-destructive-foreground text-destructive hover:bg-destructive hover:text-destructive-foreground border-destructive"
              >
                Delete Account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex w-full justify-center">
                  Delete Account
                </DialogTitle>
                <DialogDescription className="flex flex-col space-y-4 items-center">
                  <span>
                    Deleting your account is permanent and cannot be undone. Are
                    you sure you want to continue?
                  </span>
                  <ul className="px-6 w-full text-left space-y-4 list-disc">
                    <li> Your Subscription</li>
                    <li> Your Resumes</li>
                    <li> All of Your Data</li>
                  </ul>
                  <DeleteButton deleteFunction={handleDelete} />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <LogOut />
        </CardFooter>
      </Card>
    </main>
  );
};

export default Profile;
