"use client";

import Image from "next/image";
//import "./CrackerComponent.scss"; // Assuming the SCSS is saved in this file
import { useState } from "react";
import leftCandy from "@/public/candyLeft.png";
import rightCandy from "@/public/candyRight.png";
const CrackerComponent = () => {
  const [hover, setHover] = useState(false);

  return (
    <div
      id="cracker"
      className="relative cursor-pointer w-full p-8 items-center justify-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* ... */}
      <div className="absolute z-0 top-6 left-[50%] text-center ">
        <div className="bg-[#d2d2d2-lighten-10%] text-[#d2d2d2-darken-40%] text-xs">
          RESMELAUNCH
        </div>
      </div>

      <div className="absolute z-2 flex -space-x-1  hover:space-x-48 w-full duration-500 transition-all top-0 left-[50%]">
        <Image alt="candyLeft" width={94} height={96} src={leftCandy} />
        <Image alt="candyRight" width={94} height={96} src={rightCandy} />
      </div>
      {/* 
      <p className={`text-center ${hover ? "visible" : "hidden"}`}>
        Hover over the christmas cracker!
      </p> */}
    </div>
  );
};

export default CrackerComponent;
