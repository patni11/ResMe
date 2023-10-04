import { FC } from "react";

interface BuildResumeProps {
  params: {
    queries: [string];
  };
}

const BuildResume: FC<BuildResumeProps> = ({ params }) => {
  return (
    <>
      {" "}
      <div>{params.queries[0]}</div>
    </>
  );
};

export default BuildResume;
