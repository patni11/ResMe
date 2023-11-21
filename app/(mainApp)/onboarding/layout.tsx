import { fetchUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await fetchUser();
  if (user.isOnboarded === true) {
    redirect("/dashboard");
  }

  return (
    <main className="flex flex-col justify-center items-center h-full w-full space-y-12">
      <div className="flex flex-col space-y-2 justify-center items-center">
        <h1 className="font-bold text-4xl leading-none tracking-tight">
          Welcome to ResMe
        </h1>
        <h3 className="text-2xl">Let&apos;s get you setup :)</h3>
      </div>

      {children}
    </main>
  );
}
