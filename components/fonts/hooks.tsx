import { useEffect } from "react";
import { Font } from "@react-pdf/renderer";
import { ENGLISH_FONT_FAMILIES } from "./constants";
import { getAllFontFamiliesToLoad } from "./lib";

/**
 * Register all fonts to React PDF so it can render fonts correctly in PDF
 */
export const useRegisterReactPDFFont = () => {
  useEffect(() => {
    const allFontFamilies = getAllFontFamiliesToLoad();
    allFontFamilies.forEach((fontFamily) => {
      Font.register({
        family: fontFamily,
        fonts: [
          {
            src: `/fonts/${fontFamily}-Regular.ttf`,

            fontWeight: 400,
          },
          {
            src: `/fonts/${fontFamily}-Bold.ttf`,
            fontWeight: 700,
          },
          {
            src: `/fonts/${fontFamily}-Italic.ttf`,
            fontStyle: "italic",
          },
        ],
      });
    });

    // Font.register({
    //   family: "Open Sans",
    //   fonts: [
    //     {
    //       src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    //       fontWeight: "normal",
    //     },
    //     {
    //       src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
    //       fontWeight: "bold",
    //     },
    //   ],
    // });
  }, []);
};

export const useRegisterReactPDFHyphenationCallback = (fontFamily: string) => {
  useEffect(() => {
    if (ENGLISH_FONT_FAMILIES.includes(fontFamily as any)) {
      // Disable hyphenation for English Font Family so the word wraps each line
      // https://github.com/diegomura/react-pdf/issues/311#issuecomment-548301604
      Font.registerHyphenationCallback((word) => [word]);
    } else {
      // React PDF doesn't understand how to wrap non-english word on line break
      // A workaround is to add an empty character after each word
      // Reference https://github.com/diegomura/react-pdf/issues/1568
      Font.registerHyphenationCallback((word) =>
        word
          .split("")
          .map((char) => [char, ""])
          .flat()
      );
    }
  }, [fontFamily]);
};
