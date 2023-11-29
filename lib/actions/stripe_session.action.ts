"use server";
import { absoluteUrl } from "../utils";
import { fetchUser } from "./user.actions";
import { getUserSubscriptionPlan, stripe } from "../stripe";

import { PLANS } from "@/app/utils/stripe";

export async function createStripeSession(planType: string) {
  const profileUrl = absoluteUrl("/profile");

  const user = await fetchUser();
  if (!user) {
    return { error: true, message: "User Not Found" };
  }

  const subscriptionPlan = await getUserSubscriptionPlan();

  if (subscriptionPlan.isSubscribed && user.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
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
    metadata: {
      email: user.email,
    },
  });

  return { url: stripeSession.url, success: true };
}
