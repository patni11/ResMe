import { stripe } from "@/lib/stripe";
import { User } from "@/models/user";
import { headers } from "next/headers";
import type Stripe from "stripe";

export async function POST(request: Request) {
  console.log("GOT THE EVENT");
  // const body = await request.text();
  // const signature = headers().get("Stripe-Signature") ?? "";

  // let event: Stripe.Event;

  // try {
  //   event = stripe.webhooks.constructEvent(
  //     body,
  //     signature,
  //     process.env.STRIPE_WEBHOOK_SECRET || ""
  //   );
  // } catch (err) {
  //   return new Response(
  //     `Webhook Error: ${err instanceof Error ? err.message : "Unknown Error"}`,
  //     { status: 400 }
  //   );
  // }

  const event = await request.json();
  console.log("EVENT", event);

  const session = event.data.object as Stripe.Checkout.Session;

  if (!session?.metadata?.userId) {
    return new Response(null, {
      status: 200,
    });
  }

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    console.log("session metadata email", session.metadata.email);

    await User.findOneAndUpdate(
      { email: session.metadata.email },
      {
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0]?.price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
      {
        upsert: true,
      }
    );
  }

  if (event.type === "invoice.payment_succeeded") {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    console.log("invoice.payment_succeeded", subscription.id);

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

export async function GET(request: Request) {
  console.log("GOT GET REQ");
  return new Response("Hiii", { status: 200 });
}
