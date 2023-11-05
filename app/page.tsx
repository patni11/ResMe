import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { ArrowRight, Hammer } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Navbar from "@/components/Navigation/Navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import robotHuman from "@/public/robotHuman.png";
import dashboard from "@/public/dashboard.png";
import annotedResume from "@/public/annotatedResume.png";
import { ImageSlider } from "@/components/ImageSlider";

export default function Home() {
  const slides = [dashboard, annotedResume, robotHuman];

  return (
    <>
      <Navbar></Navbar>
      <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
        <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
          <p className="flex text-sm font-semibold text-gray-700">
            <Hammer className="mr-2 h-5 w-5"></Hammer>
            <span>Res&apos;Me is in Beta</span>
          </p>
        </div>
        <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
          Create Perfect <span className="text-blue-600">Resumes</span> in
          Seconds
        </h1>
        <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
          Res&apos;Me allows you to create professional Resumes. Simply enter
          your information and we&apos;ll do the rest.
        </p>

        <Link
          className={buttonVariants({
            size: "lg",
            className: "mt-5",
          })}
          href="/dashboard"
          target="_blank"
        >
          Get started <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </MaxWidthWrapper>

      {/* value proposition section */}
      <div>
        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative right-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative hidden md:block right-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>

          <div className="mb-0 md:mb-32 lg:mb-80">
            {/* <div className="mx-auto max-w-6xl px-6 lg:px-8">
              <div className="mt-16 flow-root sm:mt-24">
                <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                  <Image
                    src="/dashboard.png"
                    alt="product preview"
                    width={1364}
                    height={866}
                    quality={100}
                    className="rounded-md bg-white p-2 sm:p-8 md:p-10 shadow-2xl ring-1 ring-gray-900/10"
                  />
                </div>
              </div>
            </div> */}

            <ImageSlider slides={slides} />
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>
      </div>

      {/* Feature section */}
      <div className="mx-auto mb-32 mt-0 max-w-5xl sm:mt-56">
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="mt-2 font-bold text-4xl text-gray-900 sm:text-5xl">
              Build Resumes That Convert
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Building professional Resumes has never been easier than with
              Res&apos;Me.
            </p>
          </div>
        </div>

        {/* steps */}
        <ol className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0 md:px-6">
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-blue-600">Step 1</span>
              <span className="text-xl font-semibold">
                Sign up for an account
              </span>
              <span className="mt-2 text-zinc-700">
                Either starting out with a free plan or choose our{" "}
                <Link
                  href="/pricing"
                  className="text-blue-700 underline underline-offset-2"
                >
                  pro plan
                </Link>
                .
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-blue-600">Step 2</span>
              <span className="text-xl font-semibold">
                Enter your information
              </span>
              <span className="mt-2 text-zinc-700">
                We&apos;ll process your data and provide best keywords, best
                format to create a professional resume
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-blue-600">Step 3</span>
              <span className="text-xl font-semibold">
                Download Your Resume
              </span>
              <span className="mt-2 text-zinc-700">
                It&apos;s that simple. Try out Res&apos;Me today.
              </span>
            </div>
          </li>
        </ol>
      </div>

      <div className="px-6 lg:px-8 flex flex-col md:flex-row mx-auto mb-32 max-w-5xl sm:mt-56 mt-8 w-full justify-between md:space-x-16">
        <div className="w-full md:w-[40%]">
          <h2 className="mt-2 font-bold text-4xl text-gray-900 sm:text-5xl">
            FAQ
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Have another question? Contact me on{" "}
            <a href="https://twitter.com/resmexyz" className="underline">
              Twitter
            </a>
          </p>
        </div>
        <div className="mt-8 ml-0 md:mt-0 w-full md:w-[60%]">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>What is ResMe</AccordionTrigger>
              <AccordionContent>
                <p>
                  ResMe is designed to streamline and elevate your professional
                  journey. It organizes your experiences, skills, and projects,
                  while its intuitive Resume Builder takes care of optimal
                  formatting, keywords, and more.{" "}
                </p>
                <br />
                <p>
                  Whether you&apos;re crafting 5 or 100 resumes, ResMe manages
                  and optimizes them for you, ensuring you always put your best
                  foot forward. 🌟📄✨
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>What is ATS</AccordionTrigger>
              <AccordionContent>
                <p>
                  Think of an ATS, or Applicant Tracking System, like a resume
                  scanner that companies use to find the best matches for a job.
                  Want to make your resume ATS-friendly? Stick to
                  straightforward formatting, sprinkle in some keywords from the
                  job post, and ditch any fancy graphics.
                </p>
                <br />
                <p>But you Don&apos;t need to worry, we got you covered!😉</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>What do I get from this?</AccordionTrigger>
              <AccordionContent>
                <p>
                  ResMe, you get a one-stop-shop to sort out your professional
                  journey. 🌟 Pop in your experiences, skills, and projects, and
                  our Resume Builder does the heavy lifting — perfect
                  formatting, the right keywords, and just the ideal length.
                </p>
                <br />
                <p>
                  Whether it&apos;s 5 or 100 resumes, we&apos;ve got your back.
                  Think of it as your professional life, simplified! 😊📄✨
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Why ResMe Over Others?</AccordionTrigger>
              <AccordionContent>
                <p>
                  Alright, friend! 🚀 So, think of standard tools like Google
                  Docs or those other basic resume builders. They&apos;re like
                  blank canvases; you have to figure out the whole painting
                  yourself.{" "}
                </p>
                <br />
                <p>
                  But ResMe? It&apos;s like having an artist by your side,
                  guiding every brushstroke. Instead of wrestling with
                  formatting, fonts, and keywords, ResMe&apos;s got your back.{" "}
                </p>
                <br />
                <p>
                  We don&apos;t just offer a platform, we offer an experience.
                  It&apos;s all about making your professional journey shine,
                  without the usual hassle. And hey, whether you&apos;re
                  juggling 5 or 100 resumes, we handle it like pros. So why
                  settle for basic when you can go premium with ResMe? 🎨🖌️✨
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>Newbie vs Expert Plan</AccordionTrigger>
              <AccordionContent>
                <p>
                  As the name says: Newbie is for Noobs and Expert plan is for
                  the rest of us 🤫
                </p>
                <br />
                <p>
                  JK! 😂 With free plan: Newbie, you get everything you need to
                  craft a perfect Resume and to Organize it. However,you are
                  limited to 2 Resumes, don&apos;t get AI, link sharing, docx
                  export
                </p>
                <br />
                <p>
                  With Expert plan, Sire, you would get an AI butler to help you
                  craft a masterpiece, shareable link to PDF, Docx support and
                  many supply of beautiful resumes
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>Can I get a Refund?</AccordionTrigger>
              <AccordionContent>
                Yes. You can get refund upto 7 days. But other than your most
                recent 2 resumes, rest would get deleted.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
}
