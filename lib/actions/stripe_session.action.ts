"use server";
import { absoluteUrl } from "../utils";
import { getUserSubscriptionPlan, stripe } from "../stripe";

import { PLANS } from "@/app/utils/stripe";

export async function createStripeSession(planType?: string) {
  const profileUrl = absoluteUrl("/profile");

  const subscriptionPlan = await getUserSubscriptionPlan();

  if (!subscriptionPlan.userEmail) {
    throw new Error("User not found");
  }

  if (
    subscriptionPlan.isSubscribed &&
    subscriptionPlan.name === "Expert" &&
    planType === "Student"
  ) {
    //change plan from expert to student
  }

  // if (
  //   subscriptionPlan.isSubscribed &&
  //   subscriptionPlan.name === "Student" &&
  //   planType === "Expert"
  // ) {
  //   //change plan from student to expert
  // }

  if (
    subscriptionPlan.isSubscribed &&
    subscriptionPlan.stripeCustomerId &&
    subscriptionPlan.stripeCurrentPeriodEnd &&
    subscriptionPlan.stripeCurrentPeriodEnd.getFullYear() < 2300
  ) {
    // cancel expert plan
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: subscriptionPlan.stripeCustomerId,
      return_url: profileUrl,
    });

    return { url: stripeSession.url };
  }

  const paymentMode = planType === "Student" ? "payment" : "subscription";
  const priceId = PLANS.find((plan) => plan.name === planType)?.price.priceIds
    .test;

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: profileUrl,
    cancel_url: profileUrl,
    payment_method_types: ["card"],
    mode: paymentMode,

    billing_address_collection: "auto",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    allow_promotion_codes: true,
    metadata: {
      email: subscriptionPlan.userEmail,
      name: subscriptionPlan.username || "",
    },
  });

  return { url: stripeSession.url, success: true };
}
