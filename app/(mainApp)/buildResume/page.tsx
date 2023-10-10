"use client";
import { FC } from "react";
import MainEditor from "./mainEditor";

interface BuildResumeProps {}

const BuildResume: FC<BuildResumeProps> = async () => {
  return (
    <main className="flex justify-between w-full h-full">
      <MainEditor></MainEditor>
    </main>
  );
};

export default BuildResume;
