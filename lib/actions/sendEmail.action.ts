"use server";
import { Resend } from "resend";
import WelcomeEmail from "@/components/EmailTemplates/welcomeEmail";
import PDFDownloadedEmail from "@/components/EmailTemplates/pdfDownloadedEmail";
import { renderAsync } from "@react-email/render";
import {
  StudentEmail,
  ExpertEmail,
} from "@/components/EmailTemplates/gotPremium";
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

export async function sendStudentUpgradeEmail({
  name,
  email,
  receipt_url,
}: {
  name: string | null | undefined;
  email: string | null | undefined;
  receipt_url: string | null | undefined;
}) {
  const emailTemplate = await renderAsync(StudentEmail({ name, receipt_url }));
  try {
    // Send the email using the Resend API
    await resend.emails.send({
      from: "Shubh From ResMe <founder@resme.xyz>",
      to: email as string,
      subject: "You have been upgraded to Student Plan",
      html: emailTemplate,
    });
  } catch (error) {
    // Log any errors and re-throw the error
    console.log({ error });
    throw error;
  }
}

export async function sendExpertUpgradeEmail({
  name,
  email,
  receipt_url,
}: {
  name: string | null | undefined;
  email: string | null | undefined;
  receipt_url: string | null | undefined;
}) {
  const emailTemplate = await renderAsync(ExpertEmail({ name, receipt_url }));
  try {
    // Send the email using the Resend API
    await resend.emails.send({
      from: "Shubh From ResMe <founder@resme.xyz>",
      to: email as string,
      subject: "You have been upgraded to Expert Plan",
      html: emailTemplate,
    });
  } catch (error) {
    // Log any errors and re-throw the error
    console.log({ error });
    throw error;
  }
}
