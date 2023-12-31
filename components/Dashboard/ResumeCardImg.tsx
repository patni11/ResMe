"use client";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
//import ResumeCardImageImage from "@/public/resumeCard.png";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchResume } from "@/lib/actions/resumes.action";
import dynamic from "next/dynamic";
import LoadingSpinner from "../LoadingSpinner";

//import { useToast } from "../ui/use-toast";
interface ResumeCardImageProps {
  resumeName: string;
  resumeId: string;
  email: string;
  image: StaticImageData;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

function ResumeCardImage({
  resumeName,
  resumeId,
  email,
  image,
  aspectRatio = "portrait",
  width,
  height,
}: ResumeCardImageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const buildResume = async () => {
    let resumeHeaderLocalStorage = localStorage.getItem(
      `resumeHeader-${email}-${resumeId}`
    );

    if (!resumeHeaderLocalStorage) {
      try {
        const resume = await fetchResume(resumeId);

        localStorage.setItem(
          `certificates-${email}-${resumeId}`,
          JSON.stringify(resume.certificates)
        );

        localStorage.setItem(
          `resumeHeader-${email}-${resumeId}`,
          JSON.stringify(resume.headerInfo)
        );

        localStorage.setItem(
          `educations-${email}-${resumeId}`,
          JSON.stringify(resume.educations)
        );

        localStorage.setItem(
          `experiences-${email}-${resumeId}`,
          JSON.stringify(resume.experiences)
        );

        localStorage.setItem(
          `projects-${email}-${resumeId}`,
          JSON.stringify(resume.projects)
        );

        localStorage.setItem(
          `talents-${email}-${resumeId}`,
          JSON.stringify({
            skills: resume.skills,
            languages: resume.languages,
            interests: resume.interests,
          })
        );
      } catch (e) {
        console.log(e);
        throw alert(`There was an error ${e}`);
      }
    }

    router.push(`/buildResume/${resumeId}`);
  };
  return (
    <button
      disabled={isLoading}
      onClick={(e) => {
        e.preventDefault();
        setIsLoading(true);
        buildResume();
      }}
      key={resumeId}
      className="cursor-pointer mt-4"
    >
      <div className="overflow-hidden rounded-md">
        {!isLoading ? (
          <Image
            src={image}
            alt={resumeName}
            width={width}
            height={height}
            className={cn(
              "object-cover transition-all hover:scale-105",
              aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
            )}
            priority={true}
            style={{ width: "auto", height: "auto" }}
            placeholder="blur"
          />
        ) : (
          <div
            className="flex items-center justify-center border rounded-md"
            style={{ width: width, height: height }}
          >
            <LoadingSpinner />
          </div>
        )}
      </div>
    </button>
  );
}

export const ResumeCardImageComponent = dynamic(
  () => Promise.resolve(ResumeCardImage),
  { ssr: false }
);
