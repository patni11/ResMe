import ContentSection from "@/components/Sections/ContentSection";
import { PlusCircleIcon, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ExperienceDialogContent from "./ExperienceDialogContent";
import { getServerSession } from "next-auth/next";
import authOptions, { Session } from "@/lib/authOptions";
import { Experience } from "@/lib/types";
import { fetchExperiences } from "@/lib/actions/experience.actions";
import ExperienceCard from "./experienceCard";
export const ExperienceSection = async ({ path }: { path?: string }) => {
  const session: Session | null = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error("User not found");
  }

  const rawExperiences = JSON.parse(
    JSON.stringify(await fetchExperiences(session.user.email))
  );

  const experiences: Experience[] = rawExperiences.map((exp: any) => ({
    ...exp,
    description: Array.isArray(exp.description)
      ? exp.description.join("\n")
      : exp.description,
  }));
  return (
    <ContentSection
      cardDetails={{
        title: "Add Work Experience",
        description: "Add internship, jobs, competitions you have completed",
      }}
      dialogDetails={{
        dialogTitle: "Add Experience",
        dialogTrigger: (
          <Button>
            Add <PlusCircleIcon className="ml-1.5 h-5 w-5" />
          </Button>
        ),
        dialogContent: (
          <ExperienceDialogContent email={session.user.email} path={path} />
        ),
      }}
    >
      {!experiences || experiences.length <= 0 ? (
        <div className="flex text-sm text-accent-foreground justify-center w-full font-semibold italic">
          {" "}
          <p>You do not have any experiences. Add some</p>{" "}
        </div>
      ) : (
        <div className="flex flex-col space-y-2">
          {experiences.map((experienceVal: Experience) => {
            experienceVal = {
              company: experienceVal.company,
              location: experienceVal.location,
              positionTitle: experienceVal.positionTitle,
              experienceType: experienceVal.experienceType,
              startDate: experienceVal.startDate
                ? new Date(experienceVal.startDate)
                : experienceVal.startDate,
              endDate:
                experienceVal.endDate == "working"
                  ? "working"
                  : new Date(experienceVal.endDate),
              description: experienceVal.description,
              _id: experienceVal._id,
            };
            return (
              <ExperienceCard
                key={experienceVal._id}
                cardDetails={experienceVal}
                dialogDetails={{
                  dialogTitle: "Edit Education",
                  dialogTrigger: (
                    <Button variant="ghost" aria-label="Update">
                      <Settings2 className="w-5 h-5"></Settings2>
                    </Button>
                  ),
                  dialogContent: (
                    <ExperienceDialogContent
                      defaultValues={experienceVal}
                      email={session.user.email}
                    />
                  ),
                }}
              />
            );
          })}
        </div>
      )}
    </ContentSection>
  );
};
