import { ReactNode } from "react";
import Image, { StaticImageData } from "next/image";

import skillPageImg from "@/public/pageStyles/skills/pixelArt1.png";
import projectPageImg from "@/public/pageStyles/projects/pixelArt5.png";
import experiencePageImg from "@/public/pageStyles/experience/pixelArt1.png";
import educationPageImg from "@/public/pageStyles/education/pixelArt1.png";
import userInfoPageImg from "@/public/pageStyles/userInfo/pixelArt1.png";

type ImageKey = "skill" | "project" | "experience" | "education" | "userInfo";

const imageMap: Record<ImageKey, StaticImageData> = {
  skill: skillPageImg,
  project: projectPageImg,
  experience: experiencePageImg,
  education: educationPageImg,
  userInfo: userInfoPageImg,
};

export default async function ImageWrapper({
  children,
  imgSrc,
}: {
  children?: ReactNode | undefined;
  imgSrc: ImageKey;
}) {
  const imageToDisplay = imageMap[imgSrc];
  const quotes = [
    { quote: "Whatever you are, be a good one", person: "Abraham Lincoln" },
    {
      quote:
        "The future belongs to those who beleive in the beauty of their dreams",
      person: "Eleanor Roosevelt",
    },
    {
      quote:
        "When something is important enough, you do it even if the odds are not in your favor.",
      person: "Elon Musk",
    },
    {
      quote:
        "One of the only ways to get out of a tight box is to invent your way out",
      person: "Jeff Bezos",
    },
    { quote: "Turn your wounds into wisdom", person: "Oprah Winfrey" },
    {
      quote:
        "Success is a lousy teacher. It seduces smart people into thinking they can't lose",
      person: "Bill Gates",
    },
  ];
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  return (
    <main className="flex justify-center w-full h-full">
      {children ? children : <div></div>}
      <div className="hidden lg:block flex-shrink-0 w-1/3 max-w-[30%] h-screen sticky top-0 right-0">
        {/* Aspect ratio container */}
        <div
          className="relative h-full fixed top-0"
          style={{ paddingTop: "42.86%" }}
        >
          <Image
            src={imageToDisplay}
            quality={70}
            alt="graphic"
            placeholder="blur"
            fill // This makes the image take up the full width and height of its container
            objectFit="cover" // This ensures the image maintains its aspect ratio while filling its container
          />
          <div className="absolute bottom-5 left-5 w-[90%] z-20 mx-auto text-primary bg-white rounded-lg p-2 bg-opacity-90">
            <blockquote className="space-y-2">
              <p className="text-sm">&ldquo;{quote.quote}&rdquo;</p>
              <footer className="text-xs">{quote.person}</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </main>
  );
}
