import { FC } from "react";
import SkillsPageSection from "./pageSection";
import ImageWrapper from "@/components/ImageWrapper";
import { getServerSession } from "next-auth/next";
import authOptions, { Session } from "@/lib/authOptions";
import {
  fetchTalent,
  updateInterests,
  updateLanguages,
  updateSkills,
} from "@/lib/actions/user.actions";

interface SkillsProps {}
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Talents - ResMe",
  description: "Your Talents",
  verification: {
    google: "google-site-verification=G-501H6DW77H",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
  },
};

const Skills: FC<SkillsProps> = async () => {
  const session: Session | null = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error("User not found");
  }

  const email = session.user.email || "";
  const talents: string[][] = (await fetchTalent(email)) || [[], [], []];

  async function updateSkillsFunction(updatedSkills: string[]) {
    "use server";
    await updateSkills(email, updatedSkills, "/skills");
  }

  async function updateLanguagesFunction(updatedSkills: string[]) {
    "use server";
    await updateLanguages(email, updatedSkills, "/skills");
  }

  async function updateInterestsFunction(updatedSkills: string[]) {
    "use server";
    await updateInterests(email, updatedSkills, "/skills");
  }

  return (
    <ImageWrapper imgSrc="skill">
      <div className="flex-1 flex flex-col items-center px-8">
        <div className="flex flex-col w-full items-center">
          <SkillsPageSection
            cardDetails={{
              title: "Add Skills",
              description:
                "Add all your skills like Java, TS, AWS, Figma, Business Development etc",
            }}
            fetchedSkills={talents[0]}
            updateFunction={updateSkillsFunction}
          ></SkillsPageSection>
          <SkillsPageSection
            cardDetails={{
              title: "Add Interests",
              description:
                "Add your interests like sports, music, reading, etc",
            }}
            fetchedSkills={talents[2]}
            updateFunction={updateInterestsFunction}
          ></SkillsPageSection>
          <SkillsPageSection
            cardDetails={{
              title: "Add Languages",
              description:
                "Add the languages you know like Hindi, English, Spanish etc",
            }}
            fetchedSkills={talents[1]}
            updateFunction={updateLanguagesFunction}
          ></SkillsPageSection>
        </div>
      </div>
    </ImageWrapper>
  );
};

export default Skills;
