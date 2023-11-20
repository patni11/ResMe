"use server";
import { Resend } from "resend";
import WelcomeEmail from "@/components/EmailTemplates/welcomeEmail";
import PDFDownloadedEmail from "@/components/EmailTemplates/pdfDownloadedEmail";
import { renderAsync } from "@react-email/render";
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendWelcomeEmail({
  name,
  email,
}: {
  name: string | null | undefined;
  email: string | null | undefined;
}) {
  const emailTemplate = await renderAsync(WelcomeEmail({ name }));
  try {
    // Send the email using the Resend API
    await resend.emails.send({
      from: "Shubh From ResMe <founder@resme.xyz>",
      to: email as string,
      subject: "Welcome to ResMe",
      html: emailTemplate,
    });
  } catch (error) {
    // Log any errors and re-throw the error
    console.log({ error });
    throw error;
  }
}

export async function sendPDFDownloadEmail({
  name,
  email,
}: {
  name: string | null | undefined;
  email: string | null | undefined;
}) {
  const emailTemplate = await renderAsync(PDFDownloadedEmail({ name }));
  try {
    // Send the email using the Resend API
    await resend.emails.send({
      from: "Shubh From ResMe <founder@resme.xyz>",
      to: email as string,
      subject: "Resume Downloaded",
      html: emailTemplate,
    });
  } catch (error) {
    // Log any errors and re-throw the error
    console.log({ error });
    throw error;
  }
}
