import Navbar from "@/components/Navigation/Navbar";
import { buttonVariants } from "@/components/ui/button";
// import { PriceCards } from "./pricingCard";
import { CheckCircle2, XCircle } from "lucide-react";
import { FC } from "react";
import Link from "next/link";
import { GoPremium } from "./premiumButton";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/rRBlufM
 */
const PricingPage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <section className="min-h-screen w-full py-12 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-800 flex items-center justify-center">
        <div className="flex flex-col container px-4 md:px-6 items-center">
          <div className="font-bold text-3xl lg:text-5xl tracking-tight mb-16 mx-auto text-center">
            <h1>Why Spend Hours on Your Resume?</h1>
            <h1>
              Let <span className="text-blue-600">ResMe</span> Do It in Seconds!
            </h1>
          </div>

          <div className="flex flex-col space-y-24 md:flex-row md:space-y-0 md:space-x-4 lg:space-x-24 lg:w-[60%] w-[80%]">
            <PriceCards
              title="Newbie"
              cost="Free"
              checkedPoints={[
                "2 Resumes",
                "Instant CV",
                "Download PDF",
                "Professional Formatting",
              ]}
              unCheckedPoints={[
                "Multiple Device Access",
                "Tailored AI",
                "Only 2 Resumes",
                "Shareable Link",
                "Download Docx",
              ]}
            ></PriceCards>

            <div className="relative flex flex-col p-6 bg-white shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-purple-500 min-w-[50%]">
              <div className="px-3 py-1 text-sm text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full inline-block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                Premium
              </div>
              <div>
                <h3 className="text-2xl font-bold text-center">Expert</h3>
                <div className="flex mt-4 text-center text-zinc-600 dark:text-zinc-400 justify-center space-x-4">
                  {/* <div className="flex flex-col justify-end mb-2 text-lg">
                    <span className="text-2xl font-bold">
                      <span className="text-base font-normal">$</span>
                      6.9
                    </span>
                    <span className="bg-black h-px mt-1"></span>
                  </div> */}
                  <span className="text-4xl font-bold">$6.9</span>/ month
                </div>
                <ul className="mt-4 mb-4 space-y-8">
                  {[
                    "10 Resumes",
                    "Instant CV",
                    "Download PDF",
                    "Professional Formatting",
                    "Multiple Device Access",
                    "Tailored AI",
                    "10 Resumes",
                    "Shareable Link",
                    "Download Docx",
                  ].map((point, idx) => {
                    return (
                      <li className="flex items-center space-x-2" key={idx}>
                        <CheckCircle2 className="h-6 w-6" color="#22c55e" />
                        <span>{point}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="mt-6">
                <GoPremium />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;

interface PriceCardsProps {
  title: string;
  cost: string;
  checkedPoints: string[];
  unCheckedPoints?: string[];
  subscribe?: string;
}

const PriceCards: FC<PriceCardsProps> = ({
  title,
  cost,
  checkedPoints,
  unCheckedPoints,
  subscribe,
}) => {
  return (
    <div className="flex flex-col p-6 bg-white shadow-lg rounded-lg dark:bg-zinc-850 justify-between border border-gray-300 min-w-[50%]">
      <div>
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
      {subscribe ? (
        <div className="mt-6">
          <Link
            className={buttonVariants({
              size: "lg",
              variant: "outline",
              className: "mt-5",
            })}
            href={subscribe}
          >
            Get Started
          </Link>
        </div>
      ) : null}
    </div>
  );
};
