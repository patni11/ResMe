"use client";
import { SectionWrapper } from "./SectionWrapper";
import { getAllFontFamiliesToLoad } from "@/components/fonts/lib";
import {
  FONT_FAMILY_TO_DISPLAY_NAME,
  FONT_FAMILY_TO_STANDARD_SIZE_IN_PT,
} from "@/components/fonts/constants";
import { createSettings } from "@/store/coverLetter/settings";
import { PX_PER_PT } from "@/components/PDFComponents/common/constants";
import { Slider } from "@/components/ui/slider";
const Selection = ({
  isSelected,
  style = {},
  onClick,
  children,
}: {
  isSelected: boolean;
  style?: React.CSSProperties;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  const selectedStyle = {
    borderColor: "black",
    ...style,
  };

  return (
    <div
      //   className={buttonVariants({
      //     variant: "secondary",
      //     className:
      //       "shadow-sm border-transparent hover:border-gray-400 hover:bg-gray-100 cursor-pointer",
      //   })}
      className="flex w-[105px] cursor-pointer items-center justify-center rounded-md bg-secondary border  py-1.5 shadow-sm border-transparent hover:border-gray-400 hover:bg-gray-100"
      onClick={onClick}
      style={isSelected ? selectedStyle : style}
      onKeyDown={(e) => {
        if (["Enter", " "].includes(e.key)) onClick();
      }}
      tabIndex={0}
    >
      {children}
    </div>
  );
};

const Fonts = () => {
  const fonts = getAllFontFamiliesToLoad();
  const useSettings = createSettings("1");
  const {
    fontFamily: selectedFontFamily,
    fontSize,
    headerSize,
    changeSettings,
  } = useSettings();

  return (
    <>
      <SectionWrapper title="Fonts">
        <section className="flex flex-col space-y-4 items-center w-full">
          <div className="grid grid-cols-2 gap-2 ">
            {fonts.map((fontFamily, idx) => {
              const isSelected = selectedFontFamily === fontFamily;
              const standardSizePt =
                FONT_FAMILY_TO_STANDARD_SIZE_IN_PT[fontFamily];
              return (
                <Selection
                  key={idx}
                  isSelected={isSelected}
                  style={{
                    fontFamily,
                    fontSize: `${standardSizePt * PX_PER_PT}px`,
                  }}
                  onClick={() =>
                    changeSettings({ field: "fontFamily", value: fontFamily })
                  }
                >
                  {FONT_FAMILY_TO_DISPLAY_NAME[fontFamily]}
                </Selection>
              );
            })}
          </div>

          <div className="flex flex-col space-y-4 w-full">
            <div className="flex flex-col space-y-2">
              <div className="flex w-full justify-between">
                <h3>Font size</h3>
                <span>{fontSize}</span>
              </div>
              <Slider
                max={24}
                min={9}
                step={1}
                value={[fontSize]}
                onValueChange={(newVal) => {
                  changeSettings({
                    field: "fontSize",
                    value: newVal,
                  });
                }}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <div className="flex w-full justify-between">
                <h3>Header size</h3>
                <span>{headerSize}</span>
              </div>
              <Slider
                max={36}
                min={11}
                step={1}
                value={[headerSize]}
                onValueChange={(newVal) => {
                  changeSettings({
                    field: "headerSize",
                    value: newVal,
                  });
                }}
              />
            </div>
          </div>
        </section>
      </SectionWrapper>
    </>
  );
};

export default Fonts;
