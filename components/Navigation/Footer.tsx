import React from "react";
import Link from "next/link"; // Replace with the actual path to your logo
import { cn } from "@/lib/utils";

const Footer = () => {
  const cardClass =
    "rounded-md bg-black h-full text-white p-12 font-bold text-xl md:text-2xl lg:text-4xl flex items-center justify-center duration-500 transition-all hover:scale-105 cursor-pointer";
  return (
    <footer className="h-screen z-30 w-full border-t border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <div className="h-18 w-full bg-primary flex items-center justify-center mb-2 p-2">
        <h2 className="text-2xl font-bold text-white">RESME</h2>
      </div>
      <div className="grid grid-rows-12 grid-cols-6 lg:grid-cols-12 lg:grid-rows-6 gap-2 w-full h-full">
        <Link
          href="/support"
          className={cn(
            cardClass,
            "row-start-1 row-span-4 col-start-1 col-span-3 bg-[#79DDF6] hover:bg-[#2DC9F0]"
          )}
        >
          CONTACT
        </Link>
        <Link
          href="/about"
          className={cn(
            cardClass,
            "row-start-1 row-span-4 col-start-4 col-span-3 lg:row-start-5 lg:row-span-2 lg:col-start-1  bg-[#79DDF6] hover:bg-[#2DC9F0]"
          )}
        >
          ABOUT
        </Link>
        <a
          href="https://discord.gg/jNp89cbpSa"
          target="_blank"
          className={cn(
            cardClass,
            "row-start-5 lg:row-start-1 row-span-3 col-span-6 bg-[#91A1F3] hover:bg-[#5A72ED]"
          )}
        >
          FREE RESUME REVIEW
        </a>
        <Link
          href="/examples"
          className={cn(
            cardClass,
            "row-start-8 col-start-1 lg:row-start-4 lg:col-start-4 row-span-3 col-span-3 bg-[#91A1F3] hover:bg-[#5A72ED]"
          )}
        >
          EXAMPLES
        </Link>
        <Link
          href="/pricing"
          className={cn(
            cardClass,
            "row-start-8 col-start-4 lg:row-start-4 lg:col-start-7 row-span-3 col-span-3 bg-[#F67984] hover:bg-[#F2404F]"
          )}
        >
          PREMIUM
        </Link>

        <Link
          href="/dashboard"
          className={cn(
            cardClass,
            "row-start-11 row-span-2 col-span-2 lg:row-span-4 lg:col-span-3 bg-[#91A1F3] hover:bg-[#5A72ED]"
          )}
        >
          Dashboard
        </Link>

        <Link
          href="/ratings"
          className={cn(
            cardClass,
            "row-start-11 row-span-2 col-span-2 lg:row-start-5 lg:row-span-2 lg:col-start-10 lg:col-span-2 bg-[#75E6B5] hover:bg-[#30D990]"
          )}
        >
          RATINGS
        </Link>

        <Link
          href="/privacy"
          className={cn(
            cardClass,
            "row-start-11 col-start-5 lg:row-start-5 row-span-1 lg:col-start-12 col-span-1 text-xs lg:text-sm xl:text-xl bg-[#576175] hover:bg-[#111317]"
          )}
        >
          PRIVACY
        </Link>
        <Link
          href="/terms"
          className={cn(
            cardClass,
            "row-start-12 col-start-5 lg:row-start-6 row-span-1 lg:col-start-12 col-span-1 text-xs lg:text-sm xl:text-xl bg-[#576175] hover:bg-[#111317]"
          )}
        >
          TERMS
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
