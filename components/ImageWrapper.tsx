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
        </div>
      </div>
    </main>
  );
}
