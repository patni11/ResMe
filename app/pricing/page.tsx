import Navbar from "@/components/Navigation/Navbar";

// import { PriceCards } from "./pricingCard";
import { CheckCircle2, XCircle } from "lucide-react";

import { Metadata } from "next";
import { ComingSoon } from "@/components/Cards/ComingSoon";
import { GoPremiumButton, GoStudentButton } from "./goPremiumButton";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "ResMe",
  description: "Pricing",
  verification: {
    google: "google-site-verification=G-501H6DW77H",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
};

const PricingPage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <section className="min-h-screen w-full py-12 flex items-center justify-center">
        <div className="flex flex-col container items-center justify-center">
          <div className="font-bold text-3xl lg:text-5xl tracking-tight mb-16 mx-auto text-center">
            <h1>Why Spend Hours on Your Resume?</h1>
            <h2>
              Let <span className="text-blue-600">ResMe</span> Do It in Seconds!
            </h2>
          </div>

          <div className="flex flex-col space-y-24 md:flex-row md:space-y-0 md:space-x-4">
            <FreeCard />
            <StudentCard />
            <ExpertCard />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;

const cardClass =
  "flex flex-col p-6 bg-white shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-gray-300 min-w-[350px]";

const StudentCard = () => {
  const title = "Student";
  const cost = "$49";
  const checkedPoints = [
    "10 Resumes",
    "Instant CV",
    "Download PDF",
    "Professional Formatting",
    "Multiple Device Access",
    "100 Tailored AI Calls",
    "Shareable Link",
    "Download Docx",
  ];
  const unCheckedPoints = ["Limited Tailored AI", "Limited Resumes"];
  return (
    <div className={cn(cardClass, "relative border-blue-600")}>
      <div className="px-3 py-1 text-sm text-white bg-blue-600 rounded-full inline-block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        Most Popular
      </div>
      <div>
        <h3 className="text-2xl font-bold text-center">{title}</h3>
        <div className="flex space-y-2 flex-col mt-4 text-center text-zinc-600 dark:text-zinc-400 justify-center items-center">
          <div className="flex mt-4 text-center text-zinc-600 dark:text-zinc-400 justify-center space-x-4">
            <span className="text-4xl font-bold">{cost}</span>/Once
          </div>
          <span className="text-sm text-blue-600 rounded-full border border:blue-600 py-1 px-4 ">
            Lifetime
          </span>
        </div>
        <ul className="mt-4 mb-4 space-y-8">
          {checkedPoints.map((point, idx) => {
            return (
              <li className="flex items-center space-x-2" key={idx}>
                <CheckCircle2 className="h-6 w-6" color="#22c55e" />
                <span>{point}</span>
              </li>
            );
          })}
        </ul>
        <ul className="mt-8 space-y-8">
          {unCheckedPoints?.map((point, idx) => {
            return (
              <li className="flex items-center space-x-2" key={idx}>
                <XCircle className="h-6 w-6" color="#ef4444" />
                <span>{point}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mt-6 w-full">
        <ComingSoon style="w-full">
          <GoStudentButton />
        </ComingSoon>
      </div>
    </div>
  );
};

const ExpertCard = () => {
  const title = "Expert";
  const cost = "$6.9";
  const checkedPoints = [
    "Unlimited Resumes",
    "Instant CV",
    "Download PDF",
    "Professional Formatting",
    "Multiple Device Access",
    "Unlimited Tailored AI",
    "Shareable Link",
    "Download Docx",
  ];
  return (
    <div className={cn(cardClass, "relative border-purple-500")}>
      <div className="px-3 py-1 text-sm text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full inline-block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        Premium
      </div>
      <div>
        <h3 className="text-2xl font-bold text-center">{title}</h3>
        <div className="flex mt-4 text-center text-zinc-600 dark:text-zinc-400 justify-center space-x-4">
          <span className="text-4xl font-bold">{cost}</span>/ month
        </div>
        <ul className="mt-4 mb-4 space-y-8">
          {checkedPoints.map((point, idx) => {
            return (
              <li className="flex items-center space-x-2" key={idx}>
                <CheckCircle2 className="h-6 w-6" color="#22c55e" />
                <span>{point}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mt-6 w-full">
        <ComingSoon style="w-full">
          <GoPremiumButton />
        </ComingSoon>
      </div>
    </div>
  );
};

const FreeCard = () => {
  const title = "Newbie";
  const cost = "Free";
  const checkedPoints = [
    "3 Resumes",
    "Instant CV",
    "Download PDF",
    "Professional Formatting",
  ];

  const unCheckedPoints = [
    "Multiple Device Access",
    "Tailored AI",
    "Only 3 Resumes",
    "Shareable Link",
    "Download Docx",
  ];
  return (
    <div className={cn(cardClass)}>
      <h3 className="text-2xl font-bold text-center">{title}</h3>
      <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
        <span className="text-4xl font-bold">{cost}</span>
      </div>

      <ul className="mt-4 mb-4 space-y-8">
        {checkedPoints.map((point, idx) => {
          return (
            <li className="flex items-center space-x-2" key={idx}>
              <CheckCircle2 className="h-6 w-6" color="#22c55e" />
              <span>{point}</span>
            </li>
          );
        })}
      </ul>

      <ul className="mt-8 space-y-8">
        {unCheckedPoints?.map((point, idx) => {
          return (
            <li className="flex items-center space-x-2" key={idx}>
              <XCircle className="h-6 w-6" color="#ef4444" />
              <span>{point}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
