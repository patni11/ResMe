import { User } from "@/models/user";
import { headers } from "next/headers";
import type Stripe from "stripe";

export async function POST(request: Request) {
  console.log("GOT THE EVENT");
  const body = await request.json();
  //const signature = headers().get("Stripe-Signature") ?? "";
  const secret = body.secret;
  if (secret != process.env.SPHERE_WEBHOOK) {
    throw new Error("Sphere Wekhook Error: Not a valid secret");
  }

  if (body.active && body.events.includes("payment.successful")) {
    console.log("Payment successful");
    // await User.findOneAndUpdate(
    //     { email: session.metadata.email },
    //     {
    //       stripeSubscriptionId: subscription.id,
    //       stripeCustomerId: subscription.customer as string,
    //       stripePriceId: subscription.items.data[0]?.price.id,
    //       stripeCurrentPeriodEnd: new Date(
    //         subscription.current_period_end * 1000
    //       ),
    //     },
    //     {
    //       upsert: true,
    //     }
    //   );
  }

  //   if (event.type === "invoice.payment_succeeded") {
  //     // Retrieve the subscription details from Stripe.
  //     const subscription = await stripe.subscriptions.retrieve(
  //       session.subscription as string
  //     );

  //     console.log("invoice.payment_succeeded", subscription.id);

  //     await User.findOneAndUpdate(
  //       {
  //         stripeSubscriptionId: subscription.id,
  //       },
  //       {
  //         stripePriceId: subscription.items.data[0]?.price.id,
  //         stripeCurrentPeriodEnd: new Date(
  //           subscription.current_period_end * 1000
  //         ),
  //         AICalls: 0,
  //       }
  //     );
  //   }

  return new Response(null, { status: 200 });
}

export async function GET(request: Request) {
  console.log("GOT GET REQ");
  return new Response("Hiii", { status: 200 });
}