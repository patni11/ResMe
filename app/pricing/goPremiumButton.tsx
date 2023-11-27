"use client";
import { buttonVariants } from "@/components/ui/button";
import { createStripeSession } from "@/lib/actions/stripe_session.action";
import * as gtag from "@/lib/gtag";
export const GoPremiumButton = () => {
  const clickTracking = async () => {
    gtag.event({
      clientWindow: window,
      action: "go premium button",
      category: "purchase",
      label: "premium",
    });

    const { url } = await createStripeSession("Expert");

    window.location.href = url || "/profile";
  };
  return (
    <button
      className={buttonVariants({
        variant: "ghost",
        className:
          "w-full bg-gradient-to-r font-semibold from-pink-500 to-purple-500 hover:bg-purple-500 text-primary-foreground hover:text-primary-foreground",
      })}
      onClick={clickTracking}
    >
      Go Premium
    </button>
  );
};

export const GoStudentButton = () => {
  const clickTracking = async () => {
    gtag.event({
      clientWindow: window,
      action: "go student button",
      category: "purchase",
      label: "student",
    });

    const { url } = await createStripeSession("Student");

    window.location.href = url || "/profile";
  };
  return (
    <button
      className={buttonVariants({
        variant: "ghost",
        className:
          "w-full text-blue-600 font-semibold rounded-full border border-blue-600 hover:bg-blue-600 hover:text-primary-foreground ",
      })}
      onClick={clickTracking}
    >
      Go Student
    </button>
  );
};
