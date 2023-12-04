import dashboard from "@/public/dashboard2.png";
import sharelink from "@/public/ShareLink.png";
import docx from "@/public/docx.png";
import ai from "@/public/AI.png";

import Image, { StaticImageData } from "next/image";
interface ImageTextProps {
  heading: string;
  text: string;
  image: ImageKey;
  order?: boolean;
}
type ImageKey = "dashboard" | "ai" | "shareLink" | "docx";
const imageMap: Record<ImageKey, StaticImageData> = {
  dashboard: dashboard,
  ai: ai,
  shareLink: sharelink,
  docx: docx,
};

export const ImageText = ({ heading, text, image, order }: ImageTextProps) => {
  const TextPart = (
    <div className="flex flex-col space-y-1 md:space-y-2 lg:space-y-4 text-center lg:text-left">
      <h2 className="font-bold text-xl md:text-2xl lg:text-4xl text-primary">
        {heading}
      </h2>
      <p className="text-sm md:text-md lg:text-xl">{text}</p>
    </div>
  );

  const ImgPart = (
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
  );

  const sectionClass =
    "p-2 lg:p-12 flex flex-col lg:flex-row justify-between w-full space-y-4 lg:space-y-0 lg:space-x-32";

  return (
    <>
      {order ? (
        <section className={sectionClass}>
          {TextPart} {ImgPart}
        </section>
      ) : (
        <section className={sectionClass}>
          {ImgPart} {TextPart}
        </section>
      )}
    </>
  );
};
