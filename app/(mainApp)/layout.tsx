import { Sidebar } from "@/components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {" "}
      {/* Added for demonstration purposes, adjust width and other styles as required */}
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
