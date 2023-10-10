"use client";
import { FC, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import ResumePreview from "./ResumePreview";
import EditPanel from "./EditPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import smallScreenImage from "@/public/pageStyles/smallScreen/pixelArt1.png";
interface MainEditorProps {}

const MainEditor: FC<MainEditorProps> = () => {
  const [screenSize, setScreenSize] = useState<Number | null>(null);

  useEffect(() => {
    function updateSize() {
      setScreenSize(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  if (!screenSize) {
    return <div> Loading </div>;
  }

  return (
    <main className="flex justify-between w-full h-full">
      {screenSize >= 658 && screenSize < 1024 ? (
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
              <EditPanel />
            </div>
          </TabsContent>
          <Separator className="m-0 sm:hidden" orientation="vertical" />
          <TabsContent value="preview">
            <ResumePreview />
          </TabsContent>
        </Tabs>
      ) : screenSize >= 1024 ? (
        <>
          <div className="w-1/2">
            <EditPanel />
          </div>
          <Separator className="m-0 sm:hidden" orientation="vertical" />
          <div className="w-1/2">
            <ResumePreview />
          </div>
        </>
      ) : (
        <div className="text-center relative flex flex-col items-center justify-center align-center w-[100%] h-[100%] m-auto z-0">
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
      )}
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
