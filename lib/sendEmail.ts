import { Resend } from "resend";
import { WelcomeEmail } from "@/components/EmailTemplates/welcomeEmail";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendWelcomeEmail({
  name,
  email,
}: {
  name: string | null | undefined;
  email: string | null | undefined;
}) {
  const emailTemplate = WelcomeEmail({ name });
  try {
    // Send the email using the Resend API
    await resend.emails.send({
      from: "Shubh From ResMe <founder@resme.xyz>",
      to: email as string,
      subject: "Welcome to ResMe",
      react: emailTemplate,
    });
  } catch (error) {
    // Log any errors and re-throw the error
    console.log({ error });
    throw error;
  }
}
