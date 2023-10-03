"use client";
import { cn } from "@/lib/utils";
import { UserNav } from "./UserNav";
import Link from "next/link";
import {
  HomeIcon,
  PenSquare,
  PanelLeft,
  GraduationCap,
  Briefcase,
  FolderOpenDot,
  PocketKnife,
} from "lucide-react";
import { useState } from "react";
import { buttonVariants } from "./ui/button";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const buttonDesign =
    "flex p-2 bg-secondary text-secondary-foreground hover:bg-foreground/20 inline-flex justify-start items-center rounded-md text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  return (
    <div className={cn("h-screen", className)}>
      {isSidebarOpen ? (
        <div className="space-y-4 py-4 flex flex-col justify-between h-screen w-64 bg-secondary">
          <div className="px-3 py-2">
            <div className="px-3 py-2 flex justify-between items-center">
              <Link href="/">
                <h2 className={`${buttonDesign} font-bold text-lg`}>Res'Me</h2>
              </Link>
              <div
                className={`${buttonDesign} cursor-pointer`}
                onClick={toggleSidebar}
              >
                <PanelLeft absoluteStrokeWidth></PanelLeft>
              </div>
            </div>

            <div className="flex flex-col space-y-2 px-3 py-2">
              <Link href="/">
                <div className={`${buttonDesign} w-full border border-input`}>
                  <HomeIcon absoluteStrokeWidth></HomeIcon>

                  <span className="ml-2">Dashboard</span>
                </div>
              </Link>
              <Link href="/buildResume">
                <div className={`${buttonDesign} w-full border border-input`}>
                  <PenSquare absoluteStrokeWidth></PenSquare>
                  <span className="ml-2">Create Resume</span>
                </div>
              </Link>
              <Link href="/education">
                <div className={`${buttonDesign} w-full border border-input`}>
                  <GraduationCap absoluteStrokeWidth></GraduationCap>
                  <span className="ml-2">Education</span>
                </div>
              </Link>
              <Link href="/experience">
                <div className={`${buttonDesign} w-full border border-input`}>
                  <Briefcase absoluteStrokeWidth></Briefcase>
                  <span className="ml-2">Experience</span>
                </div>
              </Link>
              <Link href="/projects">
                <div className={`${buttonDesign} w-full border border-input`}>
                  <FolderOpenDot absoluteStrokeWidth></FolderOpenDot>
                  <span className="ml-2">Projects</span>
                </div>
              </Link>
              <Link href="/skills">
                <div className={`${buttonDesign} w-full border border-input`}>
                  <PocketKnife absoluteStrokeWidth></PocketKnife>
                  <span className="ml-2">Skills</span>
                </div>
              </Link>
            </div>
          </div>
          <div className="px-3 py-2">
            <UserNav></UserNav>
          </div>
        </div>
      ) : (
        <div className="px-3 py-2 flex justify-start items-center">
          <div
            className={`${buttonDesign} cursor-pointer`}
            onClick={toggleSidebar}
          >
            <PanelLeft absoluteStrokeWidth></PanelLeft>
          </div>
        </div>
      )}
    </div>
  );
}
