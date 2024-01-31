import Footer from "@/components/Navigation/Footer";
//import InfoHeader from "@/components/Navigation/InfoHeader";
import Navbar from "@/components/Navigation/Navbar";

export const dynamic = "force-dynamic";
//import { Sidebar } from "@/components/Navigation/Sidebar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar></Navbar>
      {/* Added for demonstration purposes, adjust width and other styles as required */}

      {children}
      <Footer />
    </>
  );
}
