import ImageWrapper from "@/components/ImageWrapper";

import { Metadata } from "next";
import { ExperienceSection } from "./ExperienceSection";
export const metadata: Metadata = {
  title: "Experience - ResMe",
  description: "Your Experiences",
  verification: {
    google: "google-site-verification=G-501H6DW77H",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
  },
};

const ExperiencePage = async () => {
  return (
    <ImageWrapper imgSrc="experience">
      <div className="flex-1 flex flex-col items-center py-12 space-y-8 px-8">
        <ExperienceSection />
      </div>
    </ImageWrapper>
  );
};

export default ExperiencePage;
