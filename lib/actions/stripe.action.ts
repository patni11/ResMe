import { absoluteUrl } from "../utils";
import { fetchUser } from "./user.actions";
import { getUserSubscriptionPlan, stripe } from "../stripe";

import { PLANS } from "@/app/utils/stripe";

export async function createStripeSession() {
  const billingUrl = absoluteUrl("/dashboard/billing");

  const user = await fetchUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const subscriptionPlan = await getUserSubscriptionPlan();

  if (subscriptionPlan.isSubscribed && user.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: billingUrl,
    });

    return { url: stripeSession.url };
  }

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: billingUrl,
    cancel_url: billingUrl,
    payment_method_types: ["card", "paypal"],
    mode: "payment",
    billing_address_collection: "auto",
    line_items: [
      {
        price: PLANS.find((plan) => plan.name === "Student")?.price.priceIds
          .test,
        quantity: 1,
      },
    ],
    metadata: {
      userEmail: user.email,
    },
  });

  return { url: stripeSession.url };
}
