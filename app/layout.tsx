import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GA_TRACKING_ID } from "../lib/gtag";
//import { SessionProvider } from "next-auth/react";
//import { Session } from "next-auth";
const inter = Inter({ subsets: ["latin"] });
import { NextAuthProvider } from "@/components/NextAuthProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://resme.xyz/"),
  title: "ResMe - Free Resume Builder",
  description: "Create Professional Resumes with ResMe GPT For FREE",

  verification: {
    google: "google-site-verification=G-501H6DW77H",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
};

export default function RootLayout({
  children,
}: // session,
{
  children: React.ReactNode;
  // session?: Session | null;
}) {
  return (
    <html lang="en">
      <head>
        <>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${GA_TRACKING_ID}', {
          page_path: window.location.pathname,
        });
      `,
            }}
          />
        </>
      </head>

      <body className={`${inter.className} `}>
        <div className="">
          <NextAuthProvider>{children}</NextAuthProvider>
        </div>
        <Toaster />
      </body>
    </html>
  );
}

// pages/_document.js or pages/_app.js
