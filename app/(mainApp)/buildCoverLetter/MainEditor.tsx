"use client";
import Image from "next/image";

//import EditPanel from "./EditPanel";
import smallScreenImage from "@/public/pageStyles/smallScreen/pixelArt1.png";
//import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import RightSidebar from "@/components/CoverLetter/RightSidebar/RightSidebar";
import { Steps } from "intro.js-react";
import { createCoverLetterSettings } from "@/store/coverLetter/settings";
import "intro.js/introjs.css";
const Center = dynamic(() => import("./Center/Center"), {
  ssr: false,
});
//import Center from "./Center/Center";

const MainEditor = () => {
  //load coverletter data
  //load setting data
  //load template
  const useCoverLetterSettings = createCoverLetterSettings("1");
  const { onboarded, changeSettings } = useCoverLetterSettings();
  const steps = [
    {
      element: ".help-button",
      intro: "Click this button anytime to view this help box",
    },
    {
      element: ".edit-toggle",
      intro: "This button toggles between edit mode and drag mode ",
    },
    {
      element: ".user-info",
      intro: "On edit mode, you can edit cover letter from here",
    },
    {
      element: ".ai",
      intro:
        "Paste your job description and AI will generate your beautiful cover letter",
    },
    {
      element: ".templates",
      intro: "Choose from many available templates",
    },
    {
      element: ".download",
      intro: "Once you are done, simply download your cover letter",
    },
  ];

  return (
    <main className="flex justify-between w-full h-full ">
      <Steps
        enabled={!onboarded}
        steps={steps}
        initialStep={0}
        onExit={() => {
          changeSettings({ field: "onboarded", value: true });
        }}
        onComplete={() => {
          changeSettings({ field: "onboarded", value: true });
        }}
      />
      {/* Display for medium screens (between 658px and 1023px) */}

      {/* Display for large screens (1024px and above) */}
      <div className="hidden xl:flex h-screen w-full overflow-hidden justify-center">
        {/* <CoverLetterPreview /> */}
        {/* <LeftSidebar /> */}
        <Center />
        <RightSidebar />
      </div>

      {/* Display for small screens (less than 658px) */}
      <div className="absolute top-24 block md:hidden text-center relative flex flex-col items-center justify-center align-center w-full my-auto z-0">
        <Image
          src={smallScreenImage}
          alt="Background Image"
          quality={50}
          width={300}
          height={100}
          placeholder="blur"
          objectFit="cover"
        />
        <br />
        <p>We currently do not support small screen sizes</p>
        <p className="font-bold"> Please try in Desktop</p>
      </div>
    </main>
  );
};

export default MainEditor;
