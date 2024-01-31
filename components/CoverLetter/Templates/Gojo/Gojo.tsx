"use client";
import clsx from "clsx";
import styles from "./Gojo.module.scss";
import { MastheadMain, MastheadSidebar } from "./widgets/Masthead";
import { createCoverLetterSettings } from "@/store/coverLetter/settings";

const Gojo: React.FC = () => {
  const useSettings = createCoverLetterSettings("1");
  const { ascentColor } = useSettings();

  return (
    <div className="h-full font-semibold">
      <div className={styles.container}>
        <div
          className={clsx(styles.sidebar, "px-4 pt-4")}
          style={{ backgroundColor: ascentColor }}
        >
          <MastheadSidebar />
        </div>
        <div className={styles.main}>
          <MastheadMain />
        </div>
      </div>
    </div>
  );
};

export default Gojo;
