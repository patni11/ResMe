//@ts-nocheck
import { PLANS } from "@/app/utils/stripe";
import {
  sendExpertUpgradeEmail,
  sendStudentUpgradeEmail,
} from "@/lib/actions/sendEmail.action";
import connectMongoDB from "@/lib/mongodb";
import { stripe } from "@/lib/stripe";
import { User } from "@/models/user";
import { headers } from "next/headers";
import type Stripe from "stripe";

export async function POST(request: Request) {
  console.log("GOT THE EVENT");
  const body = await request.text();
  const signature = headers().get("Stripe-Signature") ?? "";

  let event: Stripe.Event;

  console.log("BODY", body);
  console.log("SIGNATURE", signature);
  console.log("ENV KEY", process.env.STRIPE_WEBHOOK_SECRET);

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

  if (!session?.metadata?.email) {
    return new Response(null, {
      status: 200,
    });
  }

  if (event.type == "checkout.session.completed") {
    console.log("Inside Event Checkout");
    console.log("SESSION", session);
    let plan = PLANS[0];
    if (session.subscription != null) {
      try {
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );
        plan =
          PLANS.find(
            (plan) =>
              plan.price.priceIds.production ===
              subscription.items.data[0]?.price.id
          ) || PLANS[0];

        await connectMongoDB();
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
      } catch (e) {
        console.log("Error with processing stripe", e);
        return new Response(null, { status: 500 });
      }
    } else {
      try {
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

        await connectMongoDB();
        await User.findOneAndUpdate(
          { email: session.metadata.email },
          {
            stripeSubscriptionId: stripeSubscriptionId,
            stripeCustomerId: stripeSubscriptionId as string,
            stripePriceId: plan.price.priceIds.production,
            stripeCurrentPeriodEnd: stripeCurrentPeriodEnd,
            AICalls: 0,
          },
          {
            upsert: true,
          }
        );
      } catch (e) {
        console.log("Error with processing stripe", e);
        return new Response(null, { status: 500 });
      }
    }

    if (plan.name === "Student") {
      sendStudentUpgradeEmail({
        name: session.metadata.name,
        email: session.metadata.email,
        receipt_url: session.receipt_url,
      });
    } else if (plan.name === "Expert") {
      sendExpertUpgradeEmail({
        name: session.metadata.name,
        email: session.metadata.email,
        receipt_url: session.receipt_url,
      });
    }
  }

  if (event.type === "invoice.payment_succeeded") {
    console.log("Inside invoice payment");
    // Retrieve the subscription details from Stripe.
    try {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );

      await connectMongoDB();
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
    } catch (e) {
      console.log("Error with processing stripe", e);
      return new Response(null, { status: 500 });
    }
  }

  // if (event.type === "radar.early_fraud_warning.created") {
  //   const { payment_intent } = session;
  //   await stripe.refunds.create({ payment_intent });
  // }

  return new Response(null, { status: 200 });
}
