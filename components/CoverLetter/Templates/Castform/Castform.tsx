import clsx from "clsx";
import styles from "./Castform.module.scss";
import { MastheadMain, MastheadSidebar } from "./widgets/Masthead";
import { createSettings } from "@/store/coverLetter/settings";

const Castform: React.FC = () => {
  const isFirstPage = true;

  const useSettings = createSettings("1");
  const { fontColor, bgColor, ascentColor } = useSettings();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div
          className={clsx(styles.sidebar)}
          style={{ color: bgColor, backgroundColor: ascentColor }}
        >
          {isFirstPage && <MastheadSidebar />}
        </div>
        <div className={styles.main}>
          <div className={styles.firstPage}>
            {isFirstPage && <MastheadMain />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Castform;
