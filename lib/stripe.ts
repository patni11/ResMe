import { PLANS } from "@/app/utils/stripe";
import { fetchUser } from "./actions/user.actions";
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2023-10-16",
  typescript: true,
});

export async function getUserSubscriptionPlan() {
  const user = await fetchUser();

  if (!user || !user.email) {
    return {
      ...PLANS[0],
      isSubscribed: false,
      isCanceled: false,
      stripeCurrentPeriodEnd: null,
      stripeCustomerId: undefined,
      username: undefined,
      userEmail: undefined,
      userResumeCount: 0,
      userAICalls: 0,
    };
  }

  const isSubscribed = Boolean(
    user.stripePriceId &&
      user.stripeCurrentPeriodEnd && // 86400000 = 1 day
      user.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now()
  );

  const plan = isSubscribed
    ? PLANS.find(
        (plan) =>
          plan.price.priceIds.production === user.stripePriceId ||
          plan.price.priceIds.cryptoTest === user.stripePriceId
      )
    : null;

  let isCanceled = false;
  if (isSubscribed && user.stripeSubscriptionId && plan?.name != "Student") {
    const stripePlan = await stripe.subscriptions.retrieve(
      user.stripeSubscriptionId
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }

  return {
    ...plan,
    stripeSubscriptionId: user.stripeSubscriptionId,
    stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd,
    stripeCustomerId: user.stripeCustomerId,
    isSubscribed,
    isCanceled,
    username: user.name,
    userEmail: user.email,
    userResumeCount: user.resumeCount,
    userAICalls: user.AICalls,
  };
}
