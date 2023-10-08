import { FC } from "react";
import { Separator } from "@/components/ui/separator";
import Panel from "@/components/Panel";
import ResumePreview from "./ResumePreview";
interface BuildResumeProps {}

const BuildResume: FC<BuildResumeProps> = () => {
  return (
    <main className="flex justify-between w-full h-full">
      <Panel> Edit Panel </Panel>
      <Separator className="mx-4" orientation="vertical" />
      <Panel>
        {" "}
        <ResumePreview />{" "}
      </Panel>
    </main>
  );
};

export default BuildResume;
