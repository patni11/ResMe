import Dashboard from "@/components/Dashboard/Dashboard";
import { fetchUser } from "@/lib/actions/user.actions";
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
  const user = await fetchUser();
  if (user.isOnboarded === false) {
    redirect("/onboarding");
  }
  return (
    <>
      <div>
        <main className="flex min-h-screen flex-col items-center justify-between py-6">
          <Dashboard></Dashboard>
        </main>
      </div>
    </>
  );
}
