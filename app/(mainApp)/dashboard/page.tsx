import Dashboard from "@/components/Dashboard/Dashboard";

export default function DashboardPage() {
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