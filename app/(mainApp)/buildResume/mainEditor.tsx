"use client";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

//import EditPanel from "./EditPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import smallScreenImage from "@/public/pageStyles/smallScreen/pixelArt1.png";
//import { useSession } from "next-auth/react";
import { useState } from "react";
import dynamic from "next/dynamic";
import { ResumeDataProvider } from "./ResumeDataContext";
const EditPanel = dynamic(() => import("./EditPanel"), { ssr: false });
const ResumePreview = dynamic(() => import("./ResumePreview"), { ssr: false });
const MainEditor = ({
  email,
  resumeId,
  isSubscribed,
  name,
}: {
  email: string;
  resumeId: string;
  isSubscribed: boolean;
  name: string;
}) => {
  // const { data: session } = useSession();
  // const email = session?.user?.email || "";
  type ComponentData = { type: string; id: string };

  const [componentsData, setComponentsData] = useState<ComponentData[]>([
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
  ]);

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
              <ResumeDataProvider.Provider
                value={{
                  email: email,
                  resumeId: resumeId,
                  isSubscribed: isSubscribed,
                  name: name,
                }}
              >
                <ResumePreview
                  resumeId={resumeId}
                  email={email}
                  componentsData={componentsData}
                />
              </ResumeDataProvider.Provider>
            ) : null}
          </TabsContent>
        </Tabs>
      </div>

      {/* Display for large screens (1024px and above) */}
      <div className="hidden xl:flex h-screen w-full overflow-hidden justify-center">
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
        <div className="w-1/2 py-4 bg-gray-200 h-full" id="root">
          {email !== "" ? (
            <ResumeDataProvider.Provider
              value={{
                email: email,
                resumeId: resumeId,
                isSubscribed: isSubscribed,
                name: name,
              }}
            >
              <ResumePreview
                resumeId={resumeId}
                email={email}
                componentsData={componentsData}
              />
            </ResumeDataProvider.Provider>
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
