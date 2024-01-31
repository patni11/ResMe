"use client";
import { css } from "@emotion/css";
import clsx from "clsx";

//import Castform from "@/components/CoverLetter/Templates/Castform/Castform";

import styles from "./Page.module.scss";
import { createCoverLetterSettings } from "@/store/coverLetter/settings";
import { templateMap } from "@/lib/types/coverLetter/types";
import { useMemo } from "react";

const Page = () => {
  const useSettings = createCoverLetterSettings("1");
  const {
    bgColor,
    fontColor,
    ascentColor,
    fontFamily,
    fontSize,
    documentType,
    template,
  } = useSettings();

  const themeCSS = {
    text: fontColor,
    primary: ascentColor,
    background: bgColor,
  };
  const typographyCSS = {
    family: fontFamily,
    size: fontSize,
  };
  const TemplatePage: React.FC | null = useMemo(
    () => templateMap[template].component,
    [template]
  );

  return (
    <div
      className={styles.container}
      data-format={documentType || "A4"}
      id="element-to-print"
      style={{ overflow: "hidden", pageBreakInside: "avoid" }}
    >
      <div
        className={clsx({
          reset: true,
          [styles.page]: true,
          [styles["format-letter"]]: documentType === "Letter",
          [css(themeCSS)]: true,
          [css(typographyCSS)]: true,
        })}
      >
        {<TemplatePage />}
      </div>
    </div>
  );
};

export default Page;
