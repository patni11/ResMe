import { FC } from "react";
import SkillsPageSection from "./pageSection";
import Image from "next/image";
interface SkillsProps {}

const Skills: FC<SkillsProps> = () => {
  return (
    <main className="flex items-center w-full h-full">
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
      <div className="flex-shrink-0 w-1/3 max-w-[30%] h-full sticky top-0">
        {/* Aspect ratio container */}
        <div className="relative h-full" style={{ paddingTop: "42.86%" }}>
          <Image
            src="/pageStyles/skills/pixelArt1.png"
            alt="graphic"
            layout="fill" // This makes the image take up the full width and height of its container
            objectFit="cover" // This ensures the image maintains its aspect ratio while filling its container
          />
        </div>
      </div>
    </main>
  );
};

export default Skills;
