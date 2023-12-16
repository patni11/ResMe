"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { createResume } from "@/lib/actions/resumes.action";
import { v4 } from "uuid";
//import { fixExperience, fixStructure } from "@/app/utils/FormattingFunctions";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function CreateResumeButton({
  email,
  canCreateResumes,
}: {
  email: string;
  canCreateResumes: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const [resumeName, setResumeName] = useState("");

  const buildResume = async () => {
    const newResumeId = v4();

    const headerInfo = await getCleanedHeaderData();

    const certificates = await getCleanedCertificateData();

    const educations = await getCleanedEducationData();

    const experiences = await getCleanedExperienceData();

    const projects = await getCleanedProjectData();

    const talents = await getCleanedTalentsData();

    const res = await createResume({
      email: email,
      resumeId: newResumeId,
      resumeName: resumeName,
      skills: talents.skills.split(", "),
      languages: talents.languages.split(", "),
      interests: talents.interests.split(", "),
      educations: educations,
      certificates: certificates,
      experiences: experiences,
      projects: projects,
      headerInfo: headerInfo,
    });

    if (res.isSuccess) {
      localStorage.setItem(
        `certificates-${email}-${newResumeId}`,
        JSON.stringify(certificates)
      );

      localStorage.setItem(
        `resumeHeader-${email}-${newResumeId}`,
        JSON.stringify(headerInfo)
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
        title: `Failed: ${res.message} `,
      });
    }
    setIsLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger className="overflow-hidden rounded-md border w-full mt-4">
        <div
          className={cn(
            "h-auto w-auto aspect-[3/4] flex justify-center items-center object-cover transition-all hover:scale-105"
          )}
        >
          <PlusCircle width={50} height={50} strokeWidth="0.75px"></PlusCircle>
        </div>
      </DialogTrigger>

      {canCreateResumes ? (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Resume</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-4 items-center">
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
                  setIsLoading(true);
                  buildResume();
                }}
                variant="default"
              >
                {isLoading ? <LoadingSpinner /> : "Create"}
              </Button>
            </div>
          </div>
        </DialogContent>
      ) : (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upgrade Plan</DialogTitle>

            <div className="w-full flex flex-col space-y-2 mt-8">
              <span>Upgrade your plan to create more resumes</span>

              <Button
                variant="outline"
                className="w-full border border-blue-600 font-semibold text-blue-600 hover:bg-blue-600 hover:text-white"
                onClick={() => {
                  router.push("/pricing");
                }}
              >
                Upgrade
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      )}
    </Dialog>
  );
}
