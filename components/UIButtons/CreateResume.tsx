"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { createResume } from "@/lib/actions/resumes.action";
import { v4 } from "uuid";
import { fixExperience, fixStructure } from "@/app/utils/FormattingFunctions";
import { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import {
  getCleanedHeaderData,
  getCleanedCertificateData,
  getCleanedEducationData,
  getCleanedExperienceData,
  getCleanedProjectData,
  getCleanedTalentsData,
} from "@/lib/apiFunctions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function CreateResumeButton({ email }: { email: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const [resumeName, setResumeName] = useState("");

  const handleSave = async () => {
    setIsLoading(true);

    const newResumeId = v4();

    const resumeHeader = await getCleanedHeaderData();

    const certificates = await getCleanedCertificateData();

    const educations = await getCleanedEducationData();

    const experiences = await getCleanedExperienceData();

    const projects = await getCleanedProjectData();

    const talents = await getCleanedTalentsData();

    const processedCertificates = fixStructure(certificates.certificates);
    const processedEducation = fixStructure(educations.educations);
    const processedProjects = fixStructure(projects.projects);
    const processedHeader = resumeHeader.headerInfo;
    // delete processedHeader._id;
    // delete processedHeader.__v;
    const processedExperiences = fixStructure(
      fixExperience(experiences.experiences)
    );

    // const res = await createResume({
    //   email: email,
    //   resumeId: newResumeId,
    //   resumeName: "New Resume",
    //   skills: talents.skills.split(", "),
    //   languages: talents.languages.split(", "),
    //   interests: talents.interests.split(", "),
    //   educations: educations.educations,
    //   certificates: certificates.certificates,
    //   experiences: experiences.experiences,
    //   projects: projects.projects,
    //   headerInfo: resumeHeader.headerInfo,
    // });

    console.log("Resume Header", processedHeader);

    const res = await createResume({
      email: email,
      resumeId: newResumeId,
      resumeName: resumeName,
      skills: talents.skills.split(", "),
      languages: talents.languages.split(", "),
      interests: talents.interests.split(", "),
      educations: processedEducation,
      certificates: processedCertificates,
      experiences: processedExperiences,
      projects: processedProjects,
      headerInfo: processedHeader,
    });

    // const res = {
    //   isSuccess: true,
    //   error: false,
    // };

    if (res.isSuccess) {
      localStorage.setItem(
        `certificates-${email}-${newResumeId}`,
        JSON.stringify(certificates)
      );

      localStorage.setItem(
        `resumeHeader-${email}-${newResumeId}`,
        JSON.stringify(resumeHeader)
      );

      localStorage.setItem(
        `educations-${email}-${newResumeId}`,
        JSON.stringify(educations)
      );

      localStorage.setItem(
        `experiences-${email}-${newResumeId}`,
        JSON.stringify(experiences)
      );

      localStorage.setItem(
        `projects-${email}-${newResumeId}`,
        JSON.stringify(projects)
      );

      localStorage.setItem(
        `talents-${email}-${newResumeId}`,
        JSON.stringify(talents)
      );

      router.push(`/buildResume/${newResumeId}`);
    } else {
      console.log(res);
      const error = res.error;
      toast({
        title: `Failed: ${error} `,
      });
    }
    setIsLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger className="overflow-hidden rounded-md border w-full">
        <div
          className={cn(
            "h-auto w-auto aspect-[3/4] flex justify-center items-center object-cover transition-all hover:scale-105"
          )}
        >
          <PlusCircle width={50} height={50} strokeWidth="0.75px"></PlusCircle>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Resume</DialogTitle>
          <DialogDescription className="flex flex-col space-y-4 items-center">
            <div className="w-full flex flex-col space-y-4 mt-8">
              <Input
                value={resumeName}
                onChange={(e) => {
                  setResumeName(e.currentTarget.value);
                }}
                placeholder="Enter Resume Name"
              />

              <Button
                disabled={isLoading}
                onClick={() => {
                  handleSave();
                }}
                variant="default"
              >
                Create
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
