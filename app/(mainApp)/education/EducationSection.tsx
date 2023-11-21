import ContentSection from "@/components/Sections/ContentSection";
import { PlusCircleIcon, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth/next";
import authOptions, { Session } from "@/lib/authOptions";
import { EducationType } from "./pageTypes";

import EducationCard from "./eductionCard";

import { FC } from "react";
import { EducationDialogContent } from "./EducationDialogContent";
import { fetchEducation } from "@/lib/actions/education.actions";
import { parseDecimal } from "@/app/utils/FormattingFunctions";

interface EducationSectionProps {
  path?: string;
}

const EducationSection: FC<EducationSectionProps> = async ({ path }) => {
  const session: Session | null = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error("User not found");
  }

  const education: EducationType[] | null = JSON.parse(
    JSON.stringify(await fetchEducation(session.user.email))
  );

  return (
    <ContentSection
      cardDetails={{
        title: "Add Education",
        description: "Add schools, universities, bootcamps you have attended",
      }}
      dialogDetails={{
        dialogTitle: "Add Education",
        dialogTrigger: (
          <Button>
            Add <PlusCircleIcon className="ml-1.5 h-5 w-5" />
          </Button>
        ),
        dialogContent: (
          <EducationDialogContent email={session.user.email} path={path} />
        ),
      }}
    >
      {!education || education.length <= 0 ? (
        <div className="flex text-sm text-accent-foreground justify-center w-full font-semibold italic">
          {" "}
          <p>You do not have any education data. Add some</p>{" "}
        </div>
      ) : (
        <div className="flex flex-col space-y-2">
          {education.map((educationVal: EducationType) => {
            educationVal = {
              schoolName: educationVal.schoolName,
              major: educationVal.major,
              gpa: educationVal?.gpa ? parseDecimal(educationVal.gpa) : 0,
              degreeType: educationVal.degreeType,
              startDate: educationVal.startDate
                ? new Date(educationVal.startDate)
                : educationVal.startDate,
              endDate: educationVal.endDate
                ? new Date(educationVal.endDate)
                : educationVal.endDate,
              _id: educationVal._id,
            };
            return (
              <EducationCard
                key={educationVal._id}
                cardDetails={educationVal}
                dialogDetails={{
                  dialogTitle: "Edit Education",
                  dialogTrigger: (
                    <Button variant="ghost" aria-label="Update">
                      <Settings2 className="w-5 h-5"></Settings2>
                    </Button>
                  ),
                  dialogContent: (
                    <EducationDialogContent
                      defaultValues={educationVal}
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

export default EducationSection;
