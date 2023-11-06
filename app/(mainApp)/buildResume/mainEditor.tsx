"use client";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import ResumePreview from "./ResumePreview";
import EditPanel from "./EditPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import smallScreenImage from "@/public/pageStyles/smallScreen/pixelArt1.png";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const MainEditor = ({ resumeId = "default" }: { resumeId: string }) => {
  const { data: session } = useSession();
  const email = session?.user?.email || "";
  type ComponentData = { type: string; id: string };

  const [componentsData, setComponentsData] = useState<ComponentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Assuming session?.user?.email will eventually be populated
    const email = session?.user?.email;

    // If email isn't available yet, don't set the components
    if (!email) {
      return;
    }

    // Define initial components data with the available email
    const initialComponentsData = [
      { type: "ResumeHeader", id: `resumeHeader-${email}-${resumeId}` },
      { type: "EducationSectionCard", id: `educations-${email}-${resumeId}` },
      {
        type: "CertificateSectionCard",
        id: `certificates-${email}-${resumeId}`,
      },
      { type: "ExperienceSectionCard", id: `experiences-${email}-${resumeId}` },
      { type: "ProjectSectionCard", id: `projects-${email}-${resumeId}` },
      { type: "TalentsSection", id: `talents-${email}-${resumeId}` },
      // ... other components
    ];

    // Set the initial components data into state
    setComponentsData(initialComponentsData);
    setIsLoading(false);
  }, [session, resumeId]);

  // const [components, setComponents] = useState(initialComponents);

  // Function to move a component up
  const moveUp = (index: number) => {
    if (index === 0) return; // Can't move up the first component
    setComponentsData((prevComponents) => {
      const newComponents = [...prevComponents];
      [newComponents[index - 1], newComponents[index]] = [
        newComponents[index],
        newComponents[index - 1],
      ];
      return newComponents;
    });
  };

  const moveDown = (index: number) => {
    if (index === componentsData.length - 1) return; // Can't move down the last component
    setComponentsData((prevComponents) => {
      const newComponents = [...prevComponents];
      [newComponents[index], newComponents[index + 1]] = [
        newComponents[index + 1],
        newComponents[index],
      ];
      return newComponents;
    });
  };

  if (isLoading) {
    return <div></div>;
  }

  return (
    <main className="flex justify-between w-full h-full">
      {/* Display for medium screens (between 658px and 1023px) */}
      <div className="hidden md:block xl:hidden w-full h-full mt-2">
        <Tabs defaultValue="editPanel" className="w-full h-full mt-2">
          <TabsList className="w-full flex justify-between items-center">
            <TabsTrigger value="editPanel" className="w-full">
              Edit Panel
            </TabsTrigger>
            <TabsTrigger value="preview" className="w-full">
              Preview
            </TabsTrigger>
          </TabsList>
          <TabsContent value="editPanel">
            <div className="w-full">
              {email !== "" ? (
                <EditPanel
                  componentsData={componentsData}
                  moveDown={moveDown}
                  moveUp={moveUp}
                />
              ) : null}
            </div>
          </TabsContent>
          <Separator className="m-0 sm:hidden" orientation="vertical" />
          <TabsContent value="preview">
            {email !== "" ? (
              <ResumePreview
                resumeId={resumeId}
                email={email}
                componentsData={componentsData}
              />
            ) : null}
          </TabsContent>
        </Tabs>
      </div>

      {/* Display for large screens (1024px and above) */}
      <div className="hidden xl:flex h-screen w-full overflow-hidden">
        <div className="w-1/2">
          {email !== "" ? (
            <EditPanel
              componentsData={componentsData}
              moveDown={moveDown}
              moveUp={moveUp}
            />
          ) : null}
        </div>
        <Separator className="m-0 sm:hidden" orientation="vertical" />
        <div className="w-1/2 py-6 bg-gray-200">
          {email !== "" ? (
            <ResumePreview
              resumeId={resumeId}
              email={email}
              componentsData={componentsData}
            />
          ) : null}
        </div>
      </div>

      {/* Display for small screens (less than 658px) */}
      <div className="absolute top-24 block md:hidden text-center relative flex flex-col items-center justify-center align-center w-full my-auto z-0">
        <Image
          src={smallScreenImage}
          alt="Background Image"
          quality={50}
          width={300}
          height={100}
          placeholder="blur"
          objectFit="cover"
        />
        <br />
        <p>We currently do not support small screen sizes</p>
        <p className="font-bold"> Please try in Desktop</p>
      </div>
    </main>
  );
};

export default MainEditor;
{
  /* <main className="flex justify-between w-full h-full">

  
    <EditPanel />
  
  <Separator className="m-0 sm:hidden" orientation="vertical" />
  
    <ResumePreview />{" "}
  

</main> */
}
