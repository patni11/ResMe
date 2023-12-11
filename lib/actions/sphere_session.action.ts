"use server";
import { absoluteUrl } from "../utils";
import { getUserSubscriptionPlan } from "../stripe";

import { PLANS } from "@/app/utils/stripe";
const sdk = require("api")("@spherepay/v1.0#13uw2328llvzd245");

export async function createSphereSession(): Promise<any> {
  const profileUrl = absoluteUrl("/profile");

  const subscriptionPlan = await getUserSubscriptionPlan();

  if (!subscriptionPlan.userEmail) {
    console.log("User not found");
    throw new Error("User not found");
  }

  if (subscriptionPlan.isSubscribed && subscriptionPlan.name === "Expert") {
    //change plan from expert to student
  }

  if (
    subscriptionPlan.isSubscribed &&
    subscriptionPlan.stripeCustomerId &&
    subscriptionPlan.stripeCurrentPeriodEnd
  ) {
    return { url: profileUrl };
  }

  const priceId = PLANS.find((plan) => plan.name === "Student")?.price.priceIds
    .cryptoTest;

  sdk.auth(process.env.SPHERE_KEY);

  await sdk
    .paymentLinkController_create({
      meta: {
        email: subscriptionPlan.userEmail,
        name: subscriptionPlan.username || "",
      },
      name: "DiscountLInkTest",
      lineItems: [{ quantity: 1, price: priceId }],
    })
    .then(({ data }: { data: any }) => {
      console.log("URL", data.data.paymentLink.url);
      return { url: data.data.paymentLink.url, success: false };
    })
    // .then((sphereSession: any) => {
    //   console.log("Sphere session", sphereSession.data.paymentLink.url);
    //   return { url: sphereSession.data.paymentLink.url, success: true };
    // })
    .catch((err: any) => {
      console.log("Sphere error", err);
      return { url: "", success: false };
    });
}
