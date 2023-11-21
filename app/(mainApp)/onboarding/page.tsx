import { redirect } from "next/navigation";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Onboarding - ResMe",
  description: "Welcome To ResMe",
  verification: {
    google: "google-site-verification=G-501H6DW77H",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
  },
};

export default async function DashboardPage() {
  redirect("/onboarding/header");
}
