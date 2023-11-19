import ImageWrapper from "@/components/ImageWrapper";
import { Metadata } from "next";
import { ProjectSection } from "./ProjectSection";
export const metadata: Metadata = {
  title: "Projects - ResMe",
  description: "Your Projects",
  verification: {
    google: "google-site-verification=G-501H6DW77H",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
  },
};

const Projects = async () => {
  return (
    <ImageWrapper imgSrc="project">
      <div className="flex-1 flex flex-col items-center py-12 space-y-8 px-8">
        <ProjectSection />
      </div>
    </ImageWrapper>
  );
};

export default Projects;
