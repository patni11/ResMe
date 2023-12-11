import { sendStudentUpgradeEmail } from "@/lib/actions/sendEmail.action";
import connectMongoDB from "@/lib/mongodb";
import { User } from "@/models/user";

export async function POST(request: Request) {
  const body = await request.json();
  console.log("BODY", body);

  // const secret = body.secret;
  // if (secret != process.env.SPHERE_WEBHOOK) {
  //   throw new Error("Sphere Wekhook Error: Not a valid secret");
  // }

  const sdk = require("api")("@spherepay/v1.0#4nq81gllvur7ks");
  sdk.auth(process.env.SPHERE_KEY);

  // only student one time
  if (body.name === "payment.successful") {
    console.log("Payment successful");

    sdk
      .eventController_retrieve({ id: body.id })
      .then(async ({ data }: { data: any }) => {
        const stripeCurrentPeriodEnd = new Date(10701943420000);
        console.log(
          "Doing payment",
          data.data.event.data.payment.paymentLink.meta.email
        );
        await connectMongoDB();
        await User.findOneAndUpdate(
          {
            email: data.data.event.data.payment.paymentLink.meta
              .email as string,
          },
          {
            stripeSubscriptionId: data.data.event.data.payment.id as string,
            stripeCustomerId: data.data.event.data.payment.customer
              .id as string,
            stripePriceId: data.data.event.data.payment.paymentLink.lineItems[0]
              .price.id as string,
            stripeCurrentPeriodEnd: stripeCurrentPeriodEnd,
          },
          {
            upsert: true,
          }
        );

        await sendStudentUpgradeEmail({
          name: data.data.event.data.payment.paymentLink.meta.name,
          email: data.data.event.data.payment.paymentLink.meta.email,
          receipt_url: undefined,
        });
        return new Response(null, { status: 200 });
      })
      .catch((err: any) => {
        console.error("SDK ERRIR", err);
        return new Response(null, { status: 200 });
      });
  }
  return new Response(null, { status: 200 });
}
