"use client";

import { FC, useState } from "react";
import { signOut } from "next-auth/react";
import { Button, buttonVariants } from "@/components/ui/button";
import { createStripeSession } from "@/lib/actions/stripe_session.action";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GoStudentButton } from "@/app/pricing/goPremiumButton";
import LoadingSpinner from "@/components/LoadingSpinner";

interface DeleteButtonProps {
  deleteFunction: () => void;
}

export const DeleteButton: FC<DeleteButtonProps> = ({ deleteFunction }) => {
  const handleDelete = () => {
    deleteFunction();
    localStorage.clear();
    signOut();
  };
  return (
    <Button
      variant="outline"
      className="bg-destructive-foreground text-destructive hover:bg-destructive hover:text-destructive-foreground border-destructive"
      onClick={() => handleDelete()}
    >
      Delete Account
    </Button>
  );
};

interface LogOutButtonProps {}
export const LogOut: FC<LogOutButtonProps> = () => {
  return (
    <Button
      variant="default"
      onClick={() => {
        signOut();
      }}
    >
      Log Out
    </Button>
  );
};

export const ManageSubsription = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <div
          className={buttonVariants({ variant: "ghost", className: "w-full" })}
        >
          Manage Subscription
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center mb-4 text-xl font-semibold">
            Cancel Subscription
          </DialogTitle>

          <DialogDescription>
            If you cancel your subscription, only your three most recent resumes
            will remain. Rest will be deleted in 24 hours. Download all and/or
            switch to the Student plan to save up to 10.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <GoStudentButton />
          <Button
            variant="destructive"
            onClick={async (e) => {
              e.preventDefault();
              setIsLoading(true);
              try {
                const { url } = await createStripeSession("Expert");

                window.location.href = url || "/profile";
              } catch (e) {
                console.log("Error", e);
                toast({
                  title: "You must be signed up or there was a network issue",
                });
              }
              setIsLoading(false);
            }}
          >
            {isLoading ? <LoadingSpinner /> : <span>Unsubscribe</span>}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const SwitchToStudent = () => {
  const { toast } = useToast();

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <div
          className={buttonVariants({
            variant: "outline",
            className: "w-full",
          })}
        >
          Switch to Student
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center mb-4 text-xl font-semibold">
            Switch to Student
          </DialogTitle>

          <DialogDescription>
            You will lose all your resumes other than most recent top 10 resume
            in 24 hours. You will keep all other premium features and will get
            100 AI calls
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <GoStudentButton />
          <DialogTrigger className="w-full">
            <div
              className={buttonVariants({
                variant: "ghost",
                className:
                  "w-full bg-gradient-to-r font-semibold from-pink-500 to-purple-500 hover:bg-purple-500 text-primary-foreground hover:text-primary-foreground",
              })}
            >
              Stay Expert
            </div>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
