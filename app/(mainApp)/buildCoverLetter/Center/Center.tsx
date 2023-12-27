"use client";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

import { cn } from "@/lib/utils";

//import ArtboardController from "./ArtboardController";
import styles from "./Center.module.scss";
//import Header from "./Header";
import Page from "./Page";
//import Header from "./Header";
import { useSettings } from "@/store/coverLetter/layout";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("./Header"), {
  ssr: false,
});
const Center = () => {
  //const resume = useAppSelector((state) => state.resume.present);
  // const layout: string[][][] = get(resume, 'metadata.layout');

  //if (isEmpty(resume)) return null;
  const { isEditing } = useSettings();

  return (
    <div className={cn(styles.center)}>
      <TransformWrapper
        centerOnInit
        minScale={0.25}
        initialScale={0.75}
        limitToBounds={false}
        centerZoomedOut={false}
        pinch={{ step: 12 }}
        wheel={{ step: 0.8 }}
        disabled={isEditing}
      >
        {(controllerProps) => (
          <>
            <Header {...controllerProps} />
            <TransformComponent wrapperClass={styles.wrapper}>
              <div
                className={cn({
                  [styles.artboard]: true,
                  "flex-col": true,
                })}
              >
                <Page />
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};

export default Center;
