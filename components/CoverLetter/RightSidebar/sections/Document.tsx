import { SectionWrapper } from "./SectionWrapper";
import { Button } from "@/components/ui/button";
import { createSettings } from "@/store/coverLetter/settings";
import { cn } from "@/lib/utils";

const Document = () => {
  const useSettings = createSettings("1");
  const { documentType, changeSettings } = useSettings();

  return (
    <>
      <SectionWrapper title="Document">
        <div className="flex space-x-4 w-full">
          <Button
            variant="secondary"
            className={cn(
              "border border-transparent w-full",
              documentType == "Letter" ? "border-black" : "border-transparent"
            )}
            onClick={() => {
              changeSettings({ field: "documentType", value: "Letter" });
            }}
          >
            Letter
          </Button>
          <Button
            variant="secondary"
            className={cn(
              "border border-transparent w-full",
              documentType == "A4" ? "border-black" : "border-transparent"
            )}
            onClick={() => {
              changeSettings({ field: "documentType", value: "A4" });
            }}
          >
            A4
          </Button>
        </div>
      </SectionWrapper>
    </>
  );
};

export default Document;
