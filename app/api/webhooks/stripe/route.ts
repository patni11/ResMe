import { PLANS } from "@/app/utils/stripe";
import {
  sendExpertUpgradeEmail,
  sendStudentUpgradeEmail,
} from "@/lib/actions/sendEmail.action";
import { stripe } from "@/lib/stripe";
import { User } from "@/models/user";
import { headers } from "next/headers";
import type Stripe from "stripe";

export async function POST(request: Request) {
  console.log("GOT THE EVENT");
  const body = await request.text();
  const signature = headers().get("Stripe-Signature") ?? "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (err) {
    console.log("Error occured", err);
    return new Response(
      `Webhook Error: ${err instanceof Error ? err.message : "Unknown Error"}`,
      { status: 400 }
    );
  }

  //const event = await request.json();
  // console.log("EVENT", event);

  const session = event.data.object as Stripe.Checkout.Session;
  console.log("EVENT TYPE", event.type);
  console.log("SESSION", session);

  if (!session?.metadata?.email) {
    return new Response(null, {
      status: 200,
    });
  }

  if (event.type == "checkout.session.completed") {
    console.log("Inside Event Checkout");

    let plan = PLANS[0];
    if (session.subscription != null) {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );
      plan =
        PLANS.find(
          (plan) =>
            plan.price.priceIds.test === subscription.items.data[0]?.price.id
        ) || PLANS[0];

      await User.findOneAndUpdate(
        { email: session.metadata.email },
        {
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer as string,
          stripePriceId: subscription.items.data[0]?.price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
          AICalls: 0,
        },
        {
          upsert: true,
        }
      );
    } else if (session.payment_intent != null) {
      const paymentIntent = await stripe.checkout.sessions.retrieve(
        session.id,
        {
          expand: ["line_items", "customer", "payment_intent"],
        }
      );
      console.log("Line Items", paymentIntent.line_items.data[0].description);
      const stripeSubscriptionId = paymentIntent.id;
      plan =
        PLANS.find(
          (plan) => plan.name === paymentIntent.line_items.data[0].description
        ) || PLANS[1];
      const stripeCurrentPeriodEnd = new Date(10701943420000); //2309 year
      // PLANS.find(
      //   (plan) =>
      //     plan.price.priceIds.test === paymentIntent.items.data[0]?.price.id
      // ) || PLANS[0];

      await User.findOneAndUpdate(
        { email: session.metadata.email },
        {
          stripeSubscriptionId: stripeSubscriptionId,
          stripeCustomerId: stripeSubscriptionId as string,
          stripePriceId: plan.price.priceIds.test, //TODO:change to prod
          stripeCurrentPeriodEnd: stripeCurrentPeriodEnd,
          AICalls: 0,
        },
        {
          upsert: true,
        }
      );
    }

    // if (plan.name === "Student") {
    //   console.log("Send student Email");
    //   sendStudentUpgradeEmail({
    //     name: session.metadata.name,
    //     email: session.metadata.email,
    //     receipt_url: session.receipt_url,
    //   });
    // } else if (plan.name === "Expert") {
    //   console.log("Send Expert Email");
    //   sendExpertUpgradeEmail({
    //     name: session.metadata.name,
    //     email: session.metadata.email,
    //     receipt_url: session.receipt_url,
    //   });
    // }
  }

  if (event.type === "invoice.payment_succeeded") {
    console.log("Inside invoice payment");
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    await User.findOneAndUpdate(
      {
        stripeSubscriptionId: subscription.id,
      },
      {
        stripePriceId: subscription.items.data[0]?.price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
        AICalls: 0,
      }
    );
  }

  return new Response(null, { status: 200 });
}
