"use client";
import { SectionWrapper } from "./SectionWrapper";

import { createCoverLetterSettings } from "@/store/coverLetter/settings";

import { colorOptions } from "@/lib/types/coverLetter/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ColorPicker } from "@/components/UIButtons/ColorPicker";

const Theme = () => {
  const useSettings = createCoverLetterSettings("1");
  const { fontColor, bgColor, ascentColor, changeSettings } = useSettings();

  return (
    <>
      <SectionWrapper
        title="Theme"
        description="Select font, background, and a ascent color"
      >
        <section className="flex flex-col space-y-4 items-center w-full">
          <div className="flex flex-col space-y-4 w-full">
            <span className="text-md font-semibold">Font Color</span>
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

              <ColorPicker
                color={fontColor}
                setColor={(newColor: string) => {
                  changeSettings({ field: "fontColor", value: newColor });
                }}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-4 w-full">
            <span className="text-md font-semibold">Background Color</span>
            <div className="grid grid-cols-8 gap-2">
              {colorOptions.map((color) => (
                <Button
                  key={color}
                  size="icon"
                  className={cn(
                    "rounded-full border border-transparent w-6 h-6 border-2 shadow-outline",
                    color == bgColor ? "border-black" : "border-transparent"
                  )}
                  style={{
                    backgroundColor: color,
                    boxShadow: " 0 0 0 2px #fff",
                  }}
                  onClick={() =>
                    changeSettings({ field: "bgColor", value: color })
                  }
                />
              ))}

              <ColorPicker
                color={bgColor}
                setColor={(newColor: string) => {
                  changeSettings({ field: "bgColor", value: newColor });
                }}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-4 w-full">
            <span className="text-md font-semibold">Ascent Color</span>
            <div className="grid grid-cols-8 gap-2">
              {colorOptions.map((color) => (
                <Button
                  key={color}
                  size="icon"
                  className={cn(
                    "rounded-full border border-transparent w-6 h-6 border-2 shadow-outline",
                    color === ascentColor
                      ? "border-black"
                      : "border-transparent"
                  )}
                  style={{
                    backgroundColor: color,
                    boxShadow: " 0 0 0 2px #fff",
                  }}
                  onClick={() =>
                    changeSettings({ field: "ascentColor", value: color })
                  }
                />
              ))}

              <ColorPicker
                color={ascentColor}
                setColor={(newColor: string) => {
                  changeSettings({ field: "ascentColor", value: newColor });
                }}
              />
            </div>
          </div>
        </section>
      </SectionWrapper>
    </>
  );
};

export default Theme;
