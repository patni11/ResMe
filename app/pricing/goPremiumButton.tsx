"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import { buttonVariants } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { createStripeSession } from "@/lib/actions/stripe_session.action";
import * as gtag from "@/lib/gtag";
import { useState } from "react";
export const GoPremiumButton = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const clickTracking = async () => {
    gtag.event({
      clientWindow: window,
      action: "go premium button",
      category: "purchase",
      label: "premium",
    });

    try {
      const { url } = await createStripeSession("Expert");
      window.location.href = url || "/profile";
    } catch (e) {
      toast({
        title: "You must be signed up or there was a network issue",
      });
    }
    setIsLoading(false);
  };
  return (
    <button
      className={buttonVariants({
        variant: "ghost",
        className:
          "w-full bg-gradient-to-r font-semibold from-pink-500 to-purple-500 hover:bg-purple-500 text-primary-foreground hover:text-primary-foreground",
      })}
      onClick={() => {
        setIsLoading(true);
        clickTracking;
      }}
    >
      {isLoading ? <LoadingSpinner /> : <span>Go Premium</span>}
    </button>
  );
};

export const GoStudentButton = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const clickTracking = async () => {
    gtag.event({
      clientWindow: window,
      action: "go student button",
      category: "purchase",
      label: "student",
    });

    try {
      const { url } = await createStripeSession("Student");

      window.location.href = url || "/profile";
    } catch (e) {
      console.log("Error");
      toast({
        title: "You must be signed up or there was a network issue",
      });
    }
    setIsLoading(false);
  };
  return (
    <button
      className={buttonVariants({
        variant: "ghost",
        className:
          "w-full text-blue-600 font-semibold rounded-full border border-blue-600 hover:bg-blue-600 hover:text-primary-foreground ",
      })}
      onClick={() => {
        setIsLoading(true);
        clickTracking();
      }}
    >
      {isLoading ? <LoadingSpinner /> : <span>Go Student</span>}
    </button>
  );
};
