import Navbar from "@/components/Navigation/Navbar";
import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};
import Image from "next/image";
import signInImage from "@/public/signIn.png";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col w-full h-screen">
      <Navbar></Navbar>
      {/* <div className="md:hidden bg-background h-full">
        <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div> */}
      <div className="container relative h-full flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            Res&apos;Me
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This Website has saved me countless hours of work and
                helped me create professional resumes that got me job.&rdquo;
              </p>
              <footer className="text-sm">Luke Macjewiskie</footer>
            </blockquote>
          </div>
        </div> */}

        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src={signInImage} // Replace with your image path
              layout="fill"
              quality={70}
              placeholder="blur"
              objectFit="cover"
              alt="Background"
            />
          </div>

          {/* Rest of your content */}

          <div className="relative z-20 mt-auto text-primary bg-white rounded-lg p-4 bg-opacity-80">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This Website has saved me countless hours of work and
                helped me create professional resumes&rdquo;
              </p>
              <footer className="text-md">Shubh Patni</footer>
            </blockquote>
          </div>
        </div>

        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            {children}
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
