import { Card } from "@/components/ui/card";
import {
  GoBack,
  GoForward,
  SetUpLater,
} from "@/components/Navigation/OnboardButtons";
import { ProjectSection } from "../../projects/ProjectSection";

const EducationOnboard = () => {
  return (
    <Card className="w-[350px] p-2 lg:w-[750px] lg:p-12 lg:space-y-8 flex flex-col">
      <div className="overflow-y-auto max-h-[550px]">
        <ProjectSection key="ProjectSection" path="/onboarding/projects" />,
      </div>
      <div className="flex w-full justify-between items-center">
        <SetUpLater />
        <div className="flex space-x-2 lg:space-x-8">
          <GoBack page="/onboarding/experience" />
          <GoForward page="/onboarding/skills" />
        </div>
      </div>
    </Card>
  );
};
export default EducationOnboard;
