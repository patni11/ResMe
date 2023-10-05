"use client";
import { FC, ReactNode, useState } from "react";

import ContentSection from "@/components/Sections/ContentSection";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { PlusCircleIcon } from "lucide-react";

interface SkillsPageSectionProps {
  cardDetails: {
    title: string;
    description: string;
  };
}

const SkillsPageSection: FC<SkillsPageSectionProps> = ({ cardDetails }) => {
  const [skills, setSkills] = useState<string[]>([]);
  const [pressedSkills, setPressedSkills] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const handleAddSkills = () => {
    const newSkills = inputValue.split(",").map((skill) => skill.trim());
    setSkills((prevSkills) => [...prevSkills, ...newSkills]);
    setPressedSkills((prevSkills) => [...prevSkills, ...newSkills]);
    //setUnsavedChanges(true); // Mark changes as unsaved
    setInputValue(""); // Clear the input
  };

  const handleTogglePress = (skill: string, pressed: boolean) => {
    console.log("pressed", pressed);
    if (pressed) {
      setPressedSkills((prev) => [...prev, skill]);
    } else {
      setPressedSkills((prev) => prev.filter((s) => s !== skill));
    }
    setUnsavedChanges(true); // Mark changes as unsaved
  };

  const handleSave = () => {
    // Logic to save the state (e.g., to a backend or local storage)

    setSkills((currentSkills) =>
      currentSkills.filter((skill) => pressedSkills.includes(skill))
    );
    setUnsavedChanges(false); // Reset unsaved changes flag
  };

  return (
    <>
      <div className="flex flex-col w-[80%] items-center py-12 space-y-8">
        <ContentSection cardDetails={cardDetails}>
          <div className="flex flex-col items-center">
            <div className="relative flex flex-col space-y-4 items-center w-full min-w-[80%]">
              <div className=" flex flex-wrap space-x-4 w-full my-12 border rounded-lg px-12 py-8 justify-center">
                {skills.map((skill, idx) => (
                  <Toggle
                    key={idx}
                    aria-label={`Toggle ${skill}`}
                    variant="outline"
                    className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground rounded-xl"
                    defaultPressed
                    pressed={pressedSkills.includes(skill)}
                    onPressedChange={(pressed) =>
                      handleTogglePress(skill, pressed)
                    }
                  >
                    {skill}
                  </Toggle>
                ))}
              </div>

              <div className="flex space-x-4 absolute bottom-0 right-0 items-center">
                {unsavedChanges && (
                  <h2 className="text-destructive">
                    {" "}
                    Please save before exiting
                  </h2>
                )}

                <Button
                  disabled={!unsavedChanges}
                  onClick={handleSave}
                  className=""
                >
                  Save
                </Button>
              </div>
            </div>

            <div className="flex flex-col space-y-4 w-[40%]">
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter your skills separated by commas"
              />
              <Button onClick={handleAddSkills}>
                Add <PlusCircleIcon className="ml-1.5 h-5 w-5" />
              </Button>
            </div>
          </div>
        </ContentSection>
      </div>
    </>
  );
};

export default SkillsPageSection;
