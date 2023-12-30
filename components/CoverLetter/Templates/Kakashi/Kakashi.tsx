import { Masthead, MastheadMain } from "./widgets/Masthead";
import Image from "next/image";
import sharpImage from "@/public/coverLetter/sharpDesign1.png";
import sharpImage2 from "@/public/coverLetter/sharpDesign2.png";

const Kakashi: React.FC = () => {
  //const layout: string[][] = useAppSelector((state) => state.resume.present.metadata.layout[page]);

  return (
    <div className="relative">
      <Image
        src={sharpImage2}
        quality={70}
        alt="graphic"
        placeholder="blur"
        style={{
          width: 218,
          height: 347,
          position: "absolute",
          top: -100,
          right: -50,
        }}
        objectFit="cover" // This ensures the image maintains its aspect ratio while filling its container
      />

      <Image
        src={sharpImage}
        quality={70}
        alt="graphic"
        placeholder="blur"
        style={{
          width: 218,
          height: 347,
          position: "absolute",
          bottom: -100,
          left: -50,
          zIndex: -1,
        }}
        objectFit="cover" // This ensures the image maintains its aspect ratio while filling its container
      />
      <Masthead />
      <MastheadMain />
      {/* <div className={styles.container}>
        <div className={styles.main}>{layout[0].map((key) => getSectionById(key, Section))}</div>
        <div className={styles.sidebar}>{layout[1].map((key) => getSectionById(key, Section))}</div>
      </div> */}
    </div>
  );
};

export default Kakashi;
