import EducationSection from "../education/EducationSection";
import CertificateSection from "../education/CertificateSection";
import OnboardingCard from "./onboardingCard";
import { UserInfoFormOnboarding } from "../userInfo/UserInfoForm";
import FinishedOnboardingCard from "./FinishedOnboardingCard";
import { ExperienceSection } from "../experience/page";
import { ProjectSection } from "../projects/page";
import { OnboardSkills } from "../skills/page";
import { fetchUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const Onboarding = async () => {
  const user = await fetchUser();
  console.log("Onboarding");
  if (user.isOnboarded === true) {
    redirect("/dashboard");
  }

  const reactElements = [
    <UserInfoFormOnboarding />,
    <EducationSection />,
    <CertificateSection />,
    <ExperienceSection />,
    <ProjectSection />,
    <OnboardSkills />,
    <FinishedOnboardingCard />,
  ];

  return (
    <main className="flex flex-col justify-center items-center h-screen w-screen space-y-12">
      <div className="flex flex-col space-y-2 justify-center items-center">
        <h1 className="font-bold text-4xl leading-none tracking-tight">
          Welcome to ResMe
        </h1>
        <h3 className="text-2xl">Let's get you setup :)</h3>
      </div>
      <OnboardingCard reactElements={reactElements} />
    </main>
  );
};

export default Onboarding;
