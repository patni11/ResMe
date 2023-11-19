import EducationSection from "../education/EducationSection";
import CertificateSection from "../education/CertificateSection";
import OnboardingCard from "./onboardingCard";
import { UserInfoFormOnboarding } from "../userInfo/UserInfoForm";
import FinishedOnboardingCard from "./FinishedOnboardingCard";
import { ExperienceSection } from "../experience/ExperienceSection";
import { ProjectSection } from "../projects/ProjectSection";
import { OnboardSkills } from "../skills/OnboardSkills";
import { fetchUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const Onboarding = async () => {
  const user = await fetchUser();
  console.log("Onboarding");
  if (user.isOnboarded === true) {
    redirect("/dashboard");
  }

  const reactElements = [
    <UserInfoFormOnboarding key="UserInfoFormOnboarding" />,
    <EducationSection key="EducationSection" />,
    <CertificateSection key="CertificateSection" />,
    <ExperienceSection key="ExperienceSection" />,
    <ProjectSection key="ProjectSection" />,
    <OnboardSkills key="OnboardSkills" />,
    <FinishedOnboardingCard key="FinishedOnboardingCard" />,
  ];

  return (
    <main className="flex flex-col justify-center items-center h-screen w-screen space-y-12">
      <div className="flex flex-col space-y-2 justify-center items-center">
        <h1 className="font-bold text-4xl leading-none tracking-tight">
          Welcome to ResMe
        </h1>
        <h3 className="text-2xl">Let&apos;s get you setup :)</h3>
      </div>
      <OnboardingCard reactElements={reactElements} />
    </main>
  );
};

export default Onboarding;
