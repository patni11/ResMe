"use client";
import { ChevronLeft, ChevronRight, DotIcon } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import GlobeImage from "@/public/globe.png";
import CloudCubeImage from "@/public/cloudCube.png";
import NoteImage from "@/public/note.png";

type ImageKey = "globe" | "cloud" | "note";

const imageMap: Record<ImageKey, StaticImageData> = {
  globe: GlobeImage,
  cloud: CloudCubeImage,
  note: NoteImage,
};

export const ImageSlider = ({ slides }: { slides: any }) => {
  const headings = [
    "Intuitive Dashboard",
    "Professional Formatting",
    "❤️ by both ATS bots and humans",
  ];
  const subHeadings = [
    "Slide into ResMe's editor on the left for quick, hefty changes and catch the results instantly on the right-side preview. Plus, you can edit on the fly right in the preview. 🛠️👁️✨",
    "ResMe has the formatting for pro resumes down pat and auto-fits it to yours, so you can skip the fuss. 📄✔️✨",
    "Colorful resumes might catch the eye, but often drop the ball with ATS. ResMe's got the balance just right — resumes that dazzle both the ATS bots and human recruiters. 🤖💼👀✨",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide(); // Call nextSlide function to change the slide
    }, 3000);

    return () => clearInterval(slideInterval); // Clear the interval when the component unmounts
  }, [currentIndex, slides.length]);

  return (
    <div className="max-w-[1364px] h-[866px] w-full m-auto py-16 px-4 relative group justify-center items-center">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mt-16 flow-root sm:mt-24">
          <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            {/* <Image
              src={slides[currentIndex]}
              alt="product preview"
              width={1364}
              height={866}
              quality={70}
              placeholder="blur"
              objectFit="scale-down"
              layout="intrinsic"
              className="rounded-md bg-white p-2 sm:p-8 md:p-10 shadow-2xl ring-1 ring-gray-900/10 duration-500"
            /> */}
            <Image
              src={slides[currentIndex]}
              alt="product preview"
              width={1364}
              height={866}
              quality={70}
              placeholder="blur"
              className="rounded-md bg-white p-2 sm:p-8 md:p-10 shadow-2xl ring-1 ring-gray-900/10 duration-500"
              // Added styles for image sizing
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>

      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[55%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <ChevronLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[55%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <ChevronRight onClick={nextSlide} size={30} />
      </div>

      <div className="flex flex-col space-y-4 items-center justify-center w-full mt-16 mb-48">
        <h2 className="mt-2 font-bold text-3xl text-gray-900 sm:text-3xl text-center">
          {headings[currentIndex]}
        </h2>
        <p className="mt-4 text-md text-gray-600 max-w-[60%] text-center">
          {subHeadings[currentIndex]}
        </p>
      </div>
    </div>
  );
};

export const ImageBox = ({
  image,
  title,
  text,
}: {
  image: ImageKey;
  title: string;
  text: string;
}) => {
  return (
    <li className="md:flex-1">
      <div className="flex flex-col space-y-2 md:pb-0 md:pl-0 md:pt-4">
        <Image
          src={imageMap[image]}
          alt="product preview"
          width={500}
          height={500}
          quality={70}
          placeholder="blur"
          className="rounded-md bg-white shadow-2xl ring-1 ring-gray-900/10 duration-500 mb-2 h-auto w-auto transition-all hover:scale-105"
          // Added styles for image sizing
          style={{ maxWidth: "100%", height: "auto" }}
        />
        <span className="text-2xl font-bold">{title}</span>
        <span className="mt-2 text-zinc-700">{text}</span>
      </div>
    </li>
  );
};
