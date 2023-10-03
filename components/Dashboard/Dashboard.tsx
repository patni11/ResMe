import { FC } from "react";
import { ResumeCard } from "./ResumeCard";
import { listenNowAlbums } from "../data/albums";

import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

interface DashBoardProps {}
const DashBoard: FC<DashBoardProps> = () => {
  return (
    <>
      <div className="relative">
        <div className="flex space-x-4 pb-4 text-wrap">
          {/* <ResumeCard
            key="default"
            album={defaultResume}
            className="w-[200px]"
            aspectRatio="portrait"
            width={200}
            height={265}
          /> */}
          <div className={cn("space-y-3 w-[200px]")}>
            <div className="overflow-hidden rounded-md border">
              <Link
                href="/buildResume"
                className={cn(
                  "h-auto w-auto aspect-[3/4] flex justify-center items-center object-cover transition-all hover:scale-105"
                )}
              >
                <PlusCircle
                  width={50}
                  height={50}
                  strokeWidth="0.75px"
                ></PlusCircle>
              </Link>
            </div>

            <div className="flex justify-left">
              <h3 className="">Create Resume</h3>
            </div>
          </div>
          {listenNowAlbums.map((album) => (
            <ResumeCard
              key={album.name}
              album={album}
              className="w-[200px]"
              aspectRatio="portrait"
              width={200}
              height={265}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DashBoard;
