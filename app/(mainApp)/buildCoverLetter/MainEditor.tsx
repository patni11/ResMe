"use client";
import Image from "next/image";

//import EditPanel from "./EditPanel";
import smallScreenImage from "@/public/pageStyles/smallScreen/pixelArt1.png";
//import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import RightSidebar from "@/components/CoverLetter/RightSidebar/RightSidebar";
const Center = dynamic(() => import("./Center/Center"), {
  ssr: false,
});
//import Center from "./Center/Center";

const MainEditor = () => {
  //load coverletter data
  //load setting data
  //load template

  return (
    <main className="flex justify-between w-full h-full ">
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
