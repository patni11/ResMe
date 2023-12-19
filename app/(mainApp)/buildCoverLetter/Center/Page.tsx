import { css } from "@emotion/css";
import clsx from "clsx";

import Castform from "@/components/CoverLetter/Templates/Castform/Castform";

import styles from "./Page.module.scss";
import { createSettings } from "@/store/coverLetter/settings";

const Page = () => {
  const useSettings = createSettings("1");
  const { bgColor, fontColor, fontFamily, fontSize, headerSize, documentType } =
    useSettings();

  const themeCSS = {
    text: fontColor,
    primary: fontColor,
    background: bgColor,
  };
  const typographyCSS = {
    family: fontFamily,
    size: fontSize,
  };

  return (
    <div className={styles.container} data-format={documentType || "A4"}>
      <div
        className={clsx({
          reset: true,
          [styles.page]: true,
          [styles["format-letter"]]: documentType === "Letter",
          [css(themeCSS)]: true,
          [css(typographyCSS)]: true,
          // [css(customCSS.value)]: customCSS.visible,
        })}
      >
        {<Castform />}
      </div>
    </div>
  );
};

export default Page;
