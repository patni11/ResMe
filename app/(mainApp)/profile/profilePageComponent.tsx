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
import {
  DeleteButton,
  LogOut,
  ManageSubsription,
  SwitchToStudent,
} from "./signOutButtons";
import { Infinity, PlusCircle } from "lucide-react";
import intlFormat from "date-fns/esm/intlFormat";
import Link from "next/link";
import { GoPremiumButton } from "@/app/(misc)/pricing/goPremiumButton";

interface BillingFormProps {
  subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>;
}

const ProfilePageComponent = ({ subscriptionPlan }: BillingFormProps) => {
  const handleDelete = async () => {
    "use server";
    if (subscriptionPlan.userEmail) {
      await deleteUser(subscriptionPlan.userEmail);
    }
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
            <span>AI Calls</span>
            <span className="font-semibold">
              {subscriptionPlan.userAICalls || 0}/{subscriptionPlan.ai || 3}
            </span>
          </h2>

          {!subscriptionPlan.isSubscribed && (
            <h2
              className={`${buttonVariants({
                variant: "outline",
              })}  flex justify-between w-full`}
            >
              <span>Subscription Plan:</span>
              <span className="font-semibold">Newbie</span>
            </h2>
          )}

          {subscriptionPlan.name == "Student" && (
            <h2
              className={`${buttonVariants({
                variant: "outline",
              })}  flex justify-between w-full border border-blue-600 shadow-blue-500/50`}
            >
              <span>Subscription Plan:</span>
              <span className="font-semibold">Student</span>
            </h2>
          )}

          {subscriptionPlan.name == "Expert" && (
            <h2
              className={`${buttonVariants({
                variant: "outline",
              })}  flex justify-between w-full border border-purple-500 shadow-purple-500/50`}
            >
              <span>Subscription Plan:</span>
              <span className="font-semibold">Expert</span>
            </h2>
          )}

          {subscriptionPlan.isSubscribed &&
          subscriptionPlan != undefined &&
          subscriptionPlan.stripeCurrentPeriodEnd &&
          subscriptionPlan.stripeCurrentPeriodEnd.getFullYear() < 2300 ? (
            <div
              className={`${buttonVariants({
                variant: "outline",
              })}  flex justify-between w-full`}
            >
              <span>
                {subscriptionPlan.isCanceled
                  ? "Your plan will be canceled on "
                  : "Your plan renews on"}
              </span>

              <span>
                {intlFormat(subscriptionPlan.stripeCurrentPeriodEnd, {
                  month: "short",
                  year: "numeric",
                  day: "numeric",
                })}
              </span>
            </div>
          ) : null}

          {!subscriptionPlan.isSubscribed && (
            <Link
              className={buttonVariants({
                className:
                  "text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white",
                variant: "outline",
              })}
              href="/pricing"
            >
              Upgrade
            </Link>
          )}

          {subscriptionPlan.name == "Expert" && (
            <div className="flex space-x-2 w-full">
              <SwitchToStudent />
              <ManageSubsription />
            </div>
          )}

          {subscriptionPlan.name == "Student" && <GoPremiumButton />}
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
