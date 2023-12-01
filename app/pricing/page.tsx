import Navbar from "@/components/Navigation/Navbar";

// import { PriceCards } from "./pricingCard";
import { CheckCircle2, MinusCircle, Sparkles, XCircle } from "lucide-react";

import { Metadata } from "next";
import { GoPremiumButton, GoStudentButton } from "./goPremiumButton";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

          <div className="flex flex-col space-y-24 md:flex-row md:space-y-0 md:space-x-8">
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
  const cost = "INR4000";
  const checkedPoints = [
    "Download PDF",
    "Professional Formatting",
    "Multiple Device Access",
    "Shareable Link",
    "Download Docx",
  ];

  const hyphenPoints = ["10 Resumes", "100 Tailored AI Calls"];

  return (
    <div
      className={cn(cardClass, "relative border-blue-600 shadow-blue-500/50 ")}
    >
      <div className="px-3 py-1 text-sm text-white bg-blue-600 rounded-full inline-block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        Most Popular
      </div>

      <div>
        <h3 className="text-2xl font-bold text-center">{title}</h3>
        <div className="flex space-y-2 flex-col mt-4 text-center text-zinc-600 dark:text-zinc-400 justify-center items-center">
          <div className="flex text-center text-zinc-600 dark:text-zinc-400 justify-center space-x-4">
            <span className="text-4xl font-bold">{cost}</span>/Once
          </div>
          <div className="flex mt-4 mb-4">
            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger className="cursor-default ml-1.5">
                  <span className="text-sm text-blue-600 rounded-full border border-blue-600 py-1 px-4 hover:bg-blue-600 hover:text-white">
                    Lifetime
                  </span>
                </TooltipTrigger>
                <TooltipContent className="p-2 text-xs font-normal">
                  Pay once, use forever
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <GreenCircle checkedPoints={checkedPoints} />

          <HyphenList hyphenPoints={hyphenPoints} />
        </div>
      </div>
      <div className="mt-6 w-full">
        <GoStudentButton />
      </div>
    </div>
  );
};

const ExpertCard = () => {
  const title = "Expert";
  const cost = "INR600";
  const checkedPoints = [
    "50 Resumes (contact for more)",
    "Download PDF",
    "Professional Formatting",
    "Multiple Device Access",
    "500 Tailored AI/month",
    "Shareable Link",
    "Download Docx",
  ];

  const comingSoon = ["Cover Letters", "Portfolio Website"];
  return (
    <div
      className={cn(
        cardClass,
        "relative border-purple-500 shadow-purple-500/50"
      )}
    >
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

        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <div className="flex w-full justify-center">
              <TooltipTrigger className="cursor-default ml-1.5">
                <span className="text-sm text-blue-600 rounded-full border border-blue-600 py-1 px-4 hover:bg-blue-600 hover:text-white">
                  Coming Soon
                </span>
              </TooltipTrigger>
            </div>
            <TooltipContent className="p-2 text-xs font-normal">
              Follow us on X for updates
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <ul className="mt-4 mb-4 space-y-8">
          {comingSoon.map((point, idx) => {
            return (
              <li
                className="flex items-center space-x-2 text-blue-600 text-sm"
                key={idx}
              >
                <Sparkles className="h-4 w-4" />
                <span>{point}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mt-6 w-full">
        <GoPremiumButton />
      </div>
    </div>
  );
};

const FreeCard = () => {
  const title = "Newbie";
  const cost = "Free";
  const checkedPoints = [
    "Download PDF",
    "Professional Formatting",
    "Multiple Device Access",
  ];

  const hyphenPoints = ["3 Resumes", "3 Tailored AI"];

  const unCheckedPoints = ["Shareable Link", "Download Docx"];
  return (
    <div className={cn(cardClass, "justify-start")}>
      <h3 className="text-2xl font-bold text-center">{title}</h3>
      <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400 mb-10">
        <span className="text-4xl font-bold">{cost}</span>
      </div>

      <GreenCircle checkedPoints={checkedPoints} />
      <div className="flex flex-col space-y-8 mt-4">
        <HyphenList hyphenPoints={hyphenPoints} />

        <CrossList unCheckedPoints={unCheckedPoints} />
      </div>
    </div>
  );
};

const GreenCircle = ({ checkedPoints }: { checkedPoints: string[] }) => {
  return (
    <ul className="my-4 space-y-8">
      {checkedPoints.map((point, idx) => {
        return (
          <li className="flex items-center space-x-2" key={idx}>
            <CheckCircle2 className="h-6 w-6" color="#22c55e" />
            <span>{point}</span>
          </li>
        );
      })}
    </ul>
  );
};

const CrossList = ({ unCheckedPoints }: { unCheckedPoints: string[] }) => {
  return (
    <ul className="space-y-8">
      {unCheckedPoints?.map((point, idx) => {
        return (
          <li className="flex items-center space-x-2" key={idx}>
            <XCircle className="h-6 w-6" color="#ef4444" />
            <span>{point}</span>
          </li>
        );
      })}
    </ul>
  );
};

const HyphenList = ({ hyphenPoints }: { hyphenPoints: string[] }) => {
  return (
    <ul className="space-y-8">
      {hyphenPoints.map((point, idx) => {
        return (
          <li className="flex items-center space-x-2" key={idx}>
            <MinusCircle className="h-6 w-6" color="#a1a1aa" />
            <span>{point}</span>
          </li>
        );
      })}
    </ul>
  );
};
