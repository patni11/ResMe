"use client";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import ResumePreview from "./ResumePreview";
import EditPanel from "./EditPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import smallScreenImage from "@/public/pageStyles/smallScreen/pixelArt1.png";
import { useSession } from "next-auth/react";

const MainEditor = ({ resumeId }: { resumeId?: string }) => {
  const { data: session } = useSession();
  const email = session?.user?.email || "";

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
                <EditPanel resumeId={resumeId} email={email} />
              ) : null}
            </div>
          </TabsContent>
          <Separator className="m-0 sm:hidden" orientation="vertical" />
          <TabsContent value="preview">
            {email !== "" ? (
              <ResumePreview resumeId={resumeId} email={email} />
            ) : null}
          </TabsContent>
        </Tabs>
      </div>

      {/* Display for large screens (1024px and above) */}
      <div className="hidden xl:flex h-screen w-full overflow-hidden">
        <div className="w-1/2">
          {email !== "" ? (
            <EditPanel resumeId={resumeId} email={email} />
          ) : null}
        </div>
        <Separator className="m-0 sm:hidden" orientation="vertical" />
        <div className="w-1/2 py-6 bg-gray-200">
          {email !== "" ? (
            <ResumePreview resumeId={resumeId} email={email} />
          ) : null}
        </div>
      </div>

      {/* Display for small screens (less than 658px) */}
      <div className="block md:hidden text-center relative flex flex-col items-center justify-center align-center w-full h-full m-auto z-0">
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
