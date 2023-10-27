"use client";
import { FC, useState } from "react";

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
  fetchedSkills: string[];
  updateFunction: (updatedSkills: string[]) => void;
}

const SkillsPageSection: FC<SkillsPageSectionProps> = ({
  cardDetails,
  fetchedSkills,
  updateFunction,
}) => {
  const [skills, setSkills] = useState<string[]>(fetchedSkills);
  const [pressedSkills, setPressedSkills] = useState<string[]>(fetchedSkills);
  const [inputValue, setInputValue] = useState<string>("");
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const handleAddSkills = () => {
    const newSkills = inputValue.split(",").map((skill) => skill.trim());

    // Merge new skills with existing skills
    const mergedSkills = [...skills, ...newSkills];

    // Update state
    setSkills(mergedSkills);
    setPressedSkills((prevPressedSkills) => [
      ...prevPressedSkills,
      ...newSkills,
    ]);

    // Clear the input
    setInputValue("");

    // Update other parts of your app or backend with the merged skills
    updateFunction(mergedSkills);
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
    // Compute the new skills first
    const newSkills = skills.filter((skill) => pressedSkills.includes(skill));

    // Update the state with the new skills
    setSkills(newSkills);

    // Reset unsaved changes flag
    setUnsavedChanges(false);

    // Use the newSkills for the update function
    updateFunction(newSkills);
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
