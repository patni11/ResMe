import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { ArrowRight, Hammer } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Navbar from "@/components/Navigation/Navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import HomeBG from "@/public/HomeBG";
import robotHuman from "@/public/robotHuman.png";
import dashboard from "@/public/dashboard.png";
import annotedResume from "@/public/annotatedResume.png";
import ai from "@/public/AI.png";
import { ImageBox, ImageSlider } from "@/components/ImageSlider";

export default function Home() {
  const slides = [dashboard, ai, annotedResume, robotHuman];

  return (
    <main>
      <Navbar></Navbar>
      <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
        <HomeBG />
        <div className="relative z-1 mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
          <p className="flex text-sm font-semibold text-gray-700 z-1">
            <Hammer className="mr-2 h-5 w-5"></Hammer>
            <span>Res&apos;Me is in Beta</span>
          </p>
        </div>
        <h1 className="relative max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl z-1">
          Create Professional <span className="text-blue-600">Resumes</span> in
          Seconds
        </h1>
        <p className="relative mt-5 max-w-prose text-zinc-700 sm:text-lg z-1">
          Res&apos;Me allows you to create professional Resumes. Simply enter
          your information and we&apos;ll do the rest.
        </p>

        <Link
          className={buttonVariants({
            size: "lg",
            className: "mt-5 relative z-1",
          })}
          href="/dashboard"
        >
          Get started <ArrowRight className="ml-2 h-5 w-5" />
        </Link>

        {/* value proposition section */}
        <div>
          <div className="relative isolate">
            {/* <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            >
              <div
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-25 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              />
              <div
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
                className="relative right-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-25 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              />
              <div
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
                className="relative hidden md:block right-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              />
            </div> */}

            <div className="mb-0 md:mb-32 lg:mb-80">
              <ImageSlider slides={slides} />
            </div>

            {/* <div
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
            </div> */}
          </div>
        </div>

        {/* Feature section */}
        <div className="mx-auto mb-24 mt-0 max-w-5xl sm:mt-56">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl "
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative -left-[calc(100%-13rem)] aspect-[1155/678] w-[36.125rem] translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"
            />
          </div>
          <div className="mb-12  lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="mt-2 font-bold text-4xl text-gray-900 sm:text-5xl">
                Elevate Your Career with Tailored Resumes
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Create, Customize, and Share Your Professional Story with Ease
              </p>
            </div>
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl top-280"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"
            />
          </div>

          {/* steps */}
          <ol className="mb-12  lg:px-8 my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0 md:">
            <ImageBox
              image="note"
              title="Edit"
              text="Need it fast? Craft a resume instantly with our easy-to-use, pre-formatted tools"
            />
            <ImageBox
              image="cloud"
              title="Store"
              text="Organise your career history with ease on our platform"
            />

            <ImageBox
              image="globe"
              title="Publish"
              text="Quickly download as PDF or Word, or share a direct link to your resume"
            />
          </ol>
        </div>

        {/* Signup section */}
        <div className="mx-auto mb-24 mt-0 max-w-5xl sm:mt-56">
          <div className="mb-12  lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="mt-2 font-bold text-4xl text-gray-900 sm:text-5xl">
                Build Resumes That Work
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Building professional Resumes has never been easier than with
                Res&apos;Me.
              </p>
            </div>
          </div>

          {/* steps */}
          <ol className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
            <li className="md:flex-1">
              <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-blue-600">
                  Step 1
                </span>
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
                <span className="text-sm font-medium text-blue-600">
                  Step 2
                </span>
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
                <span className="text-sm font-medium text-blue-600">
                  Step 3
                </span>
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
        {/* <HomeBG className="absolute top-1000" /> */}

        <div className="relative lg:px-8 flex flex-col md:flex-row mx-auto mb-24 max-w-5xl sm:mt-56 mt-8 w-full justify-between md:space-x-16">
          <HomeBG className="absolute bottom-0 -z-10 w-full h-full" />
          <div className="w-full md:w-[40%] relative z-1">
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
              <AccordionItem value="item-0">
                <AccordionTrigger>Get Free Resume Review</AccordionTrigger>
                <AccordionContent className="text-left justify-left">
                  <p className="">
                    We have created a exclusive community of ResMe users like
                    yourself. Join our discord and get free resume reviews by me
                    personally and wider community
                  </p>
                  <br />
                  <a href="https://discord.gg/jNp89cbpSa" className="underline">
                    Discord
                  </a>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-1">
                <AccordionTrigger>What is ResMe</AccordionTrigger>
                <AccordionContent className="text-left justify-left">
                  <p>
                    ResMe is designed to streamline and elevate your
                    professional journey. It organizes your experiences, skills,
                    and projects, while its intuitive Resume Builder takes care
                    of optimal formatting, keywords, and more.{" "}
                  </p>
                  <br />
                  <p>
                    Whether you&apos;re crafting 5 or 100 resumes, ResMe manages
                    and optimizes them for you, ensuring you always put your
                    best foot forward. 🌟📄✨
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>What is ATS</AccordionTrigger>
                <AccordionContent className="text-left justify-left">
                  <p>
                    Think of an ATS, or Applicant Tracking System, like a resume
                    scanner that companies use to find the best matches for a
                    job. Want to make your resume ATS-friendly? Stick to
                    straightforward formatting, sprinkle in some keywords from
                    the job post, and ditch any fancy graphics.
                  </p>
                  <br />
                  <p>But you Don&apos;t need to worry, we got you covered!😉</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>What do I get from this?</AccordionTrigger>
                <AccordionContent className="text-left justify-left">
                  <p>
                    ResMe, you get a one-stop-shop to sort out your professional
                    journey. 🌟 Pop in your experiences, skills, and projects,
                    and our Resume Builder does the heavy lifting — perfect
                    formatting, the right keywords, and just the ideal length.
                  </p>
                  <br />
                  <p>
                    Whether it&apos;s 5 or 100 resumes, we&apos;ve got your
                    back. Think of it as your professional life, simplified!
                    😊📄✨
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Why ResMe Over Others?</AccordionTrigger>
                <AccordionContent className="text-left justify-left">
                  <p>
                    Most resume building tools are not optimized for ATS and
                    parsers. You can try it yourself. Just create one, download
                    pdf, and try to copy/paste its text. You will get all
                    gibberish for many of them. Repeat the same with a ResMe
                    pdf.
                  </p>
                  <br />
                  <p>
                    Unlike other tools, ResMe allows your to save your resumes,
                    manage them, and share a live link to them. Our AI even
                    helps you find the perfect keywods and right formatting
                  </p>
                  <br />
                  <p>
                    But thats not all. We don&apos;t just offer a platform, we
                    offer an experience. It&apos;s all about making your
                    professional journey shine, without the usual hassle. So why
                    settle for basic when you can go premium with ResMe? 🎨🖌️✨
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Newbie vs Student vs Expert</AccordionTrigger>
                <AccordionContent className="text-left justify-left">
                  <p>
                    As the name says: Newbie is for Noobs and Expert plan is for
                    the rest of us 🤫
                  </p>
                  <br />
                  <p>
                    JK! 😂 With free plan: Newbie, you get everything you need
                    to craft a perfect Resume and to organize it. However,you
                    are limited to 3 Resumes, don&apos;t get AI, link sharing,
                    and docx export
                  </p>
                  <br />
                  <p>
                    Student plan is pay once use forever! You get everything in
                    free plan with 10 resumes, link sharing, docx export, and
                    limited AI
                  </p>
                  <br />
                  <p>
                    With Expert plan, Sire, you would get an AI butler to help
                    you craft a masterpiece, shareable link to PDF, Docx support
                    and upto 100 beautiful resumes
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>Can I get a Refund?</AccordionTrigger>
                <AccordionContent className="text-left justify-left">
                  <p>
                    No, we do not offer refunds, but you can cancel subscription
                    for next month. You can use our free plan or student plan
                    (one-time) plan before signing up for subscription.
                  </p>
                  <br />
                  <p>
                    Note: Other than your most recent 3 resumes, rest would get
                    deleted as they are not available in free plan. We also
                    provide instant access to purchased service no{" "}
                    <a href="https://merchant.razorpay.com/policy/N5ZhTj0wfZOO7m/shipping">
                      shipping
                    </a>{" "}
                    required
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger>How was ResMe built?</AccordionTrigger>
                <AccordionContent className="text-left justify-left">
                  <p>
                    ResMe was built using Next js, Zustand, MongoDB, Next Auth,
                    and Chat GPT
                  </p>
                  <br />
                  <p>
                    I have used various resources like react-pdf, landing page
                    from Josh Tried Coding{" "}
                    <a
                      href="https://www.youtube.com/watch?v=ucX2zXAZ1I0&t=36514"
                      target="blank"
                      className="underline"
                    >
                      tutorial
                    </a>
                    , stripe, shadcn ui and background svg from{" "}
                    <a href="SVGBackgrounds.com" className="underline">
                      SVG Backgrounds
                    </a>
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger>What is AI Call?</AccordionTrigger>
                <AccordionContent className="text-left justify-left">
                  <p>
                    1 AI call gives you 3-4 perfect bullet points for your
                    resume
                  </p>
                  <br />
                  <p>
                    Unlike most AI based apps we don't have confusing token
                    system, instead each time you sucessfully use AI, it's
                    counted as 1 call
                  </p>
                  <br />
                  <p>
                    Free plans comes with 3 calls, so you can try it. Student
                    plan gives you 100, enough to create 10-15 resumes. Expert
                    plan gives you 500/month, enough to try as many resumes as
                    you like.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </MaxWidthWrapper>
    </main>
  );
}
