import { getUserSubscriptionPlan } from "@/lib/stripe";

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
import { deleteUser } from "@/lib/actions/user.actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DeleteButton, LogOut } from "./signOutButtons";
import { format } from "date-fns";
import { Infinity } from "lucide-react";

interface BillingFormProps {
  subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>;
}

const ProfilePageComponent = ({ subscriptionPlan }: BillingFormProps) => {
  const handleDelete = async () => {
    "use server";
    await deleteUser(subscriptionPlan.userEmail);
  };
  return (
    <main className="flex w-full h-full items-center justify-center px-8">
      <Card className="w-[100%] mt-24 md:w-[50%] max-w-[450px] my-auto">
        <CardHeader>
          <CardTitle>{subscriptionPlan.username || "Your Account"} </CardTitle>
          <CardDescription>{subscriptionPlan.userEmail || ""}</CardDescription>
        </CardHeader>

        <Separator className="mb-6" />

        <CardContent className="flex flex-col space-y-4 justify-center">
          <h2
            className={`${buttonVariants({
              variant: "outline",
            })} w-full flex justify-between`}
          >
            <span>Resumes Created</span>
            <span className="font-semibold">
              {subscriptionPlan.userResumeCount}
            </span>
          </h2>

          <h2
            className={`${buttonVariants({
              variant: "outline",
            })} w-full flex justify-between`}
          >
            <span>AI Calls Left</span>
            <span className="font-semibold">
              {subscriptionPlan.userAICalls || 0}/{subscriptionPlan.ai || 3}
            </span>
          </h2>

          <h2
            className={`${buttonVariants({
              variant: "outline",
            })}  flex justify-between w-full`}
          >
            <span>Subscription Plan:</span>{" "}
            <span className="font-semibold">
              {subscriptionPlan.name || "Newbie"}
            </span>
          </h2>

          {subscriptionPlan.name != "Newbie" &&
          subscriptionPlan != undefined ? (
            <h2
              className={`${buttonVariants({
                variant: "outline",
              })}  flex justify-between w-full`}
            >
              {subscriptionPlan.isCanceled
                ? "Your plan will be canceled on "
                : "Your plan renews on"}
              {subscriptionPlan.stripeCurrentPeriodEnd ? (
                format(subscriptionPlan.stripeCurrentPeriodEnd, "dd.MM.yyyy")
              ) : (
                <Infinity className="h-3 w-3" />
              )}
            </h2>
          ) : null}

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
              <h2
                className={buttonVariants({
                  size: "sm",
                  className:
                    "bg-destructive-foreground text-destructive hover:bg-destructive hover:text-destructive-foreground border-destructive",
                  variant: "ghost",
                })}
              >
                Delete Account
              </h2>
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

export default ProfilePageComponent;
