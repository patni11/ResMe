"use client";
import { SectionWrapper } from "./SectionWrapper";

import { createSettings } from "@/store/coverLetter/settings";

import { colorOptions } from "@/lib/types/coverLetter/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ColorPicker } from "@/components/UIButtons/ColorPicker";

const Theme = () => {
  const useSettings = createSettings("1");
  const { fontColor, bgColor, changeSettings } = useSettings();

  return (
    <>
      <SectionWrapper title="Theme">
        <section className="flex flex-col space-y-4 items-center w-full">
          <div className="flex flex-col space-y-4 w-full">
            <span>Font Color</span>
            <div className="grid grid-cols-8 gap-2">
              {colorOptions.map((color) => (
                <Button
                  key={color}
                  size="icon"
                  className={cn(
                    "rounded-full border border-transparent w-6 h-6 border-2 shadow-outline",
                    color == fontColor ? "border-black" : "border-transparent"
                  )}
                  style={{
                    backgroundColor: color,
                    boxShadow: " 0 0 0 2px #fff",
                  }}
                  onClick={() =>
                    changeSettings({ field: "fontColor", value: color })
                  }
                />
              ))}
            </div>
          </div>

          <div className="flex justify-between w-full">
            <span>Background Color</span>

            <ColorPicker
              color={bgColor}
              setColor={(newColor: string) => {
                changeSettings({ field: "fontColor", value: newColor });
              }}
            />
          </div>
        </section>
      </SectionWrapper>
    </>
  );
};

export default Theme;
