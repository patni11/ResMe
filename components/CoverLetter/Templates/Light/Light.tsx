import { Masthead, MastheadMain } from "./widgets/Masthead";

const Light: React.FC = () => {
  //const layout: string[][] = useAppSelector((state) => state.resume.present.metadata.layout[page]);

  return (
    <div>
      <Masthead />
      <MastheadMain />
      {/* <div className={styles.container}>
        <div className={styles.main}>{layout[0].map((key) => getSectionById(key, Section))}</div>
        <div className={styles.sidebar}>{layout[1].map((key) => getSectionById(key, Section))}</div>
      </div> */}
    </div>
  );
};

export default Light;
