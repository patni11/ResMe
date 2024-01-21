"use client";
import {
  BadgeHelp,
  FileEdit,
  Fullscreen,
  HandIcon,
  PanelRight,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { useSettings } from "@/store/coverLetter/layout";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactZoomPanPinchHandlers } from "react-zoom-pan-pinch";
import React from "react";
//import { useAllKeys } from "react-keyboard-hooks";
import ExportPDF from "./ExportPDF.js";
import { createCoverLetterSettings } from "@/store/coverLetter/settings";

export const ItemsButton = ({
  children,
  tooltipText,
  onClick,
}: {
  children: React.ReactNode;
  tooltipText: string;
  onClick?: () => void;
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger className="cursor-default ml-1">
          <div
            className="text-xs flex space-x-1 items-center justify-center cursor-pointer"
            onClick={onClick}
          >
            {children}
          </div>
        </TooltipTrigger>
        <TooltipContent className="p-2 text-xs font-normal">
          {tooltipText}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const Header: React.FC<ReactZoomPanPinchHandlers> = ({
  zoomIn,
  zoomOut,
  centerView,
}) => {
  const { toggleSidebar, toggleEditing, isEditing } = useSettings();
  const useCoverLetterSettings = createCoverLetterSettings("1");
  const { changeSettings } = useCoverLetterSettings();
  // document.addEventListener("keydown", (event) => {
  //   event.preventDefault();
  //   if (event.key === "e") {
  //     // Ctrl+S
  //     console.log("Shortcut");
  //     toggleEditing();
  //   }
  // });

  // useAllKeys(["Meta", "J"], () => {
  //   console.log("Key Pressed");
  //   //toggleEditing();
  //   centerView(0.75);
  // });

  return (
    <main className="fixed z-0 -translate-x-1/2 top-10 left-[50%] w-fit-content px-8 py-2 rounded-full flex backdrop-blur-sm bg-white/50 space-x-4">
      <ItemsButton
        onClick={toggleEditing}
        tooltipText={isEditing ? "Click to Drag" : "Click to Edit"}
      >
        {isEditing ? (
          <HandIcon className="h-5 w-5 edit-toggle" color="#ef4444" />
        ) : (
          <FileEdit className="h-5 w-5 edit-toggle" color="#0ea5e9" />
        )}
      </ItemsButton>
      <ExportPDF />
      <Separator className="bg-white text-white" orientation="vertical" />

      {/* Reset Zoom */}

      <ItemsButton onClick={() => zoomOut(0.25)} tooltipText="Zoom Out">
        <ZoomOut className="h-5 w-5" />
      </ItemsButton>
      <ItemsButton onClick={() => zoomIn(0.25)} tooltipText="Zoom In">
        <ZoomIn className="h-5 w-5" />
      </ItemsButton>

      {/*  Center Art Board */}
      <ItemsButton
        onClick={() => centerView(0.75)}
        tooltipText="Center Artboard"
      >
        <Fullscreen className="h-5 w-5" />
      </ItemsButton>

      <Separator className="bg-white text-white" orientation="vertical" />
      <ItemsButton
        onClick={() => changeSettings({ field: "onboarded", value: false })}
        tooltipText="View Steps"
      >
        <BadgeHelp className="h-5 w-5 help-button" />
      </ItemsButton>
      <ItemsButton onClick={() => "right"} tooltipText="Toggle Right Panel">
        <PanelRight className="h-5 w-5" />
      </ItemsButton>
    </main>
  );
};
export default Header;
