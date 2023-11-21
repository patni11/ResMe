import { Card } from "@/components/ui/card";
import {
  GoBack,
  GoForward,
  SetUpLater,
} from "@/components/Navigation/OnboardButtons";
import CertificateSection from "../../education/CertificateSection";

const EducationOnboard = () => {
  return (
    <Card className="w-[350px] p-2 lg:w-[750px] lg:p-12 lg:space-y-8 flex flex-col">
      <div className="overflow-y-auto max-h-[550px]">
        <CertificateSection
          key="EducationSection"
          path="/onboarding/certificates"
        />
      </div>
      <div className="flex w-full justify-between items-center">
        <SetUpLater />
        <div className="flex space-x-2 lg:space-x-8">
          <GoBack page="/onboarding/education" />
          <GoForward page="/onboarding/experience" />
        </div>
      </div>
    </Card>
  );
};
export default EducationOnboard;
