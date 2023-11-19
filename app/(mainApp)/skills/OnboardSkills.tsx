import SkillsPageSection from "./pageSection";
import { getServerSession } from "next-auth/next";
import authOptions, { Session } from "@/lib/authOptions";
import { fetchTalent, updateSkills } from "@/lib/actions/user.actions";

export const OnboardSkills = async () => {
  const session: Session | null = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error("User not found");
  }

  const email = session.user.email || "";
  const talents: string[][] = (await fetchTalent(email)) || [[], [], []];

  async function updateSkillsFunction(updatedSkills: string[]) {
    "use server";
    await updateSkills(email, updatedSkills, "/onboarding");
  }

  return (
    <SkillsPageSection
      cardDetails={{
        title: "Add Skills",
        description:
          "Add all your skills like Java, TS, AWS, Figma, Business Development etc",
      }}
      fetchedSkills={talents[0]}
      updateFunction={updateSkillsFunction}
    ></SkillsPageSection>
  );
};
