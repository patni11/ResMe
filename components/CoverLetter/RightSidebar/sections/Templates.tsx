import Image from "next/image";
import { TemplateMeta, templateMap } from "@/lib/types/coverLetter/types";
import { SectionWrapper } from "./SectionWrapper";

const Templates = () => {
  const handleChange = (template: TemplateMeta) => {
    console.log("Changed template");
  };

  return (
    <>
      <SectionWrapper title="Templates" contentSize="max-h-96">
        <div className="grid grid-cols-2 gap-4 ">
          {Object.values(templateMap).map((template) => (
            <div key={template.id}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleChange(template);
                }}
                className="cursor-pointer mt-4 "
              >
                <div className="relative overflow-hidden rounded-md flex justify-center">
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
