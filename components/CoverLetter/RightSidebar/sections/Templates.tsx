import Image from "next/image";
import { templateMap } from "@/lib/types/coverLetter/types";
import { SectionWrapper } from "./SectionWrapper";
import { createCoverLetterSettings } from "@/store/coverLetter/settings";
import { cn } from "@/lib/utils";

const Templates = () => {
  const useSettings = createCoverLetterSettings("1");
  const { template: currentTemplate, changeSettings } = useSettings();

  return (
    <>
      <SectionWrapper
        title="Templates"
        contentSize="max-h-96"
        description="Select a template"
      >
        <div className="grid grid-cols-2 gap-4 ">
          {Object.values(templateMap).map((template) => (
            <div key={template.id}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  changeSettings({ field: "template", value: template.id });
                }}
                className="cursor-pointer mt-4 "
              >
                <div
                  className={cn(
                    "relative border-2 overflow-hidden rounded-md flex justify-center",
                    currentTemplate === template.id
                      ? "border-black"
                      : "border-transparent"
                  )}
                >
                  {/* <Image
                      src={template.preview}
                      alt={template.name}
          
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-all hover:scale-105 aspect-[3/4]"
                      priority={true}
                      style={{ width: "auto", height: "auto" }}
                      placeholder="blur"
                    /> */}

                  <Image
                    src={template.preview}
                    alt={template.name}
                    width={200}
                    height={265}
                    className="relative object-cover transition-all hover:scale-105 aspect-[3/4]"
                    priority={true}
                    style={{ width: "auto", height: "auto" }}
                    // placeholder="blur"
                  />
                  <p className="absolute text-xs font-medium bottom-2">
                    {template.name}
                  </p>
                </div>
              </button>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
};

export default Templates;
