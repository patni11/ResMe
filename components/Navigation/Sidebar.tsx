"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  HomeIcon,
  PenSquare,
  PanelLeft,
  GraduationCap,
  Briefcase,
  FolderOpenDot,
  PocketKnife,
  User2,
  ScrollText,
  BadgeHelp,
  MessageCircle,
  BookOpenText,
} from "lucide-react";
import { ReactNode, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { buttonVariants } from "../ui/button";
import { DialogHeader } from "../ui/dialog";
import FeedbackButton from "../UIButtons/Feedback";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
}

export function Sidebar({ className, children }: SidebarProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const buttonDesign =
    "flex p-2 bg-secondary text-secondary-foreground hover:bg-foreground/20 inline-flex justify-start items-center rounded-md text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  return (
    <>
      {isSidebarOpen ? (
        <div className={cn("h-screen sticky top-0", className)}>
          <div className="space-y-4 py-4 flex flex-col justify-between h-screen w-64 bg-secondary">
            <div className="px-3 py-2">
              <div className="px-3 py-2 flex justify-between items-center">
                <Link href="/">
                  <h2 className={`${buttonDesign} font-bold text-lg`}>
                    Res&apos;Me
                  </h2>
                </Link>
                <div
                  className={`${buttonDesign} cursor-pointer`}
                  onClick={toggleSidebar}
                >
                  <PanelLeft absoluteStrokeWidth></PanelLeft>
                </div>
              </div>

              <div className="flex flex-col space-y-2 px-3 py-2">
                <Link href="/dashboard">
                  <div className={`${buttonDesign} w-full border border-input`}>
                    <HomeIcon absoluteStrokeWidth></HomeIcon>

                    <span className="ml-2">Dashboard</span>
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
                <Link href="/userInfo">
                  <div className={`${buttonDesign} w-full border border-input`}>
                    <User2 absoluteStrokeWidth></User2>
                    <span className="ml-2">Your Info</span>
                  </div>
                </Link>
                <Link href="/bulidCoverLetter/1">
                  <div className={`${buttonDesign} w-full border border-input`}>
                    <ScrollText absoluteStrokeWidth />
                    <span className="ml-2">Cover Letter</span>{" "}
                    <span className="p-0.25 bg-blue-600/80 rounded-full text-primary-foreground text-[10px] px-2 ml-2 ring-2 ring-offset-slate-200">
                      Soon
                    </span>
                  </div>
                </Link>
              </div>
            </div>
            <div className="px-3 py-2 flex flex-col space-y-4">
              <Dialog>
                <DialogTrigger className="">
                  <div
                    className={`${buttonDesign} text-blue-600 w-full border border-input rounded-md`}
                  >
                    <BadgeHelp absoluteStrokeWidth />

                    <span className="ml-2">Help</span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center mb-4 text-xl font-semibold">
                      How ResMe Works
                    </DialogTitle>
                  </DialogHeader>
                  <div>
                    <div className="py-6">bla bla bla</div>
                    <div className="flex flex-col space-y-2 items-center">
                      <span className="font-semibold text-md ">
                        Need More Help?
                      </span>
                      <div className="flex w-full space-x-4 justify-center">
                        <a
                          href="https://discord.gg/jNp89cbpSa"
                          className={buttonVariants({
                            variant: "outline",
                          })}
                        >
                          <MessageCircle absoluteStrokeWidth className="mr-2" />
                          Chat with us
                        </a>
                        <a
                          href="https://shubhpatni.notion.site/ResMe-Guide-d26e9c7c3a6044c89b7cdd9ea7bd830a?pvs=4"
                          className={buttonVariants({
                            variant: "outline",
                          })}
                        >
                          <BookOpenText className="h-5 w-5 mr-2" /> Detailed
                          Guide
                        </a>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <FeedbackButton />

              <div className="mt-4">{children}</div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`absolute top-2 left-2 ${buttonDesign} cursor-pointer`}
          onClick={toggleSidebar}
        >
          <PanelLeft absoluteStrokeWidth></PanelLeft>
        </div>
      )}
    </>
  );
}
