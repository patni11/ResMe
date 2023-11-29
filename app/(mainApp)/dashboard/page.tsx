import Dashboard from "@/components/Dashboard/Dashboard";
import { fetchDashboardData } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard - ResMe",
  description: "Manage Resumes",
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
  const data = await fetchDashboardData();
  if (!data) {
    throw alert("could not fetch resumes, try again");
  }
  const { isOnboarded, email, resumes } = data;
  if (isOnboarded === false) {
    redirect("/onboarding/header");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-6">
      <Dashboard email={email} resumes={resumes}></Dashboard>
    </main>
  );
}
