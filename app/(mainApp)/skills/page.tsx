import { FC } from "react";
import SkillsPageSection from "./pageSection";
import ImageWrapper from "@/components/ImageWrapper";

interface SkillsProps {}

const Skills: FC<SkillsProps> = async () => {
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
          ></SkillsPageSection>

          <SkillsPageSection
            cardDetails={{
              title: "Add Languages",
              description:
                "Add the languages you know like Hindi, English, Spanish etc",
            }}
          ></SkillsPageSection>
          <SkillsPageSection
            cardDetails={{
              title: "Add Interests",
              description:
                "Add your interests like sports, music, reading, etc",
            }}
          ></SkillsPageSection>
        </div>
      </div>
    </ImageWrapper>
  );
};

export default Skills;
