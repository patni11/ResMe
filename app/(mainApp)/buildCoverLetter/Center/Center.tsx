"use client";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

import { cn } from "@/lib/utils";

//import ArtboardController from "./ArtboardController";
import styles from "./Center.module.scss";
//import Header from "./Header";
import Page from "./Page";

const Center = () => {
  //const resume = useAppSelector((state) => state.resume.present);
  // const layout: string[][][] = get(resume, 'metadata.layout');

  //if (isEmpty(resume)) return null;

  return (
    <div className={cn(styles.center)}>
      {/* <Header /> */}

      <TransformWrapper
        centerOnInit
        minScale={0.25}
        initialScale={0.95}
        limitToBounds={false}
        centerZoomedOut={false}
        pinch={{ step: 12 }}
        wheel={{ step: 0.8 }}
      >
        {(controllerProps) => (
          <>
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

            {/* <ArtboardController {...controllerProps} /> */}
          </>
        )}
      </TransformWrapper>
    </div>
  );
};

export default Center;
