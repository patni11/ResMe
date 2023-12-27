import { useMemo } from "react";

import Markdown from "../shared/templateShared/Markdown";
import styles from "./Kakuna.module.scss";
import Masthead from "./widgets/Masthead";
import Section from "./widgets/Section";
import { createCoverLetterData } from "@/store/coverLetter/data";

const Kakuna: React.FC = () => {
  const useCoverLetterData = createCoverLetterData("1");
  const { text } = useCoverLetterData();

  //const layout: string[][] = useAppSelector((state) => state.resume.present.metadata.layout[page]);

  return (
    <div className={styles.page}>
      <Masthead />
      <Markdown className="mb-2 text-center">{text}</Markdown>

      {/* <div className={styles.container}>
        <div className={styles.main}>{layout[0].map((key) => getSectionById(key, Section))}</div>
        <div className={styles.sidebar}>{layout[1].map((key) => getSectionById(key, Section))}</div>
      </div> */}
    </div>
  );
};

export default Kakuna;
