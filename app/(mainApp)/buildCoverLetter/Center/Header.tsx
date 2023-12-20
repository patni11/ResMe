import {
  AlignCenter,
  Fullscreen,
  PanelLeft,
  PanelRight,
  Save,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useSettings } from "@/store/coverLetter/layout";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ItemsButton = ({
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
        <TooltipTrigger className="cursor-default ml-1.5">
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

export default function Header() {
  const { toggleSidebar } = useSettings();
  return (
    <main className="fixed z-2 top-10 left-[50%] w-fit-content px-8 py-2 rounded-full flex backdrop-blur-sm bg-white/50 space-x-4">
      <ItemsButton
        onClick={() => console.log("Save PDF")}
        tooltipText="Download PDF"
      >
        <Save className="h-4 w-4" />
      </ItemsButton>

      {/* Reset Zoom */}
      <ItemsButton
        onClick={() => console.log("Save PDF")}
        tooltipText="Reset Zoom"
      >
        <Fullscreen className="h-4 w-4" />
      </ItemsButton>

      {/*  Center Art Board */}
      <ItemsButton
        onClick={() => console.log("Save PDF")}
        tooltipText="Center Artboard"
      >
        <AlignCenter className="h-4 w-4" />
      </ItemsButton>

      <Separator className="mx-1 bg-white text-white" orientation="vertical" />

      <ItemsButton
        onClick={() => toggleSidebar("left")}
        tooltipText="Toggle Left Panel"
      >
        <PanelLeft className="h-4 w-4" />
      </ItemsButton>
      <ItemsButton
        onClick={() => toggleSidebar("right")}
        tooltipText="Toggle Right Panel"
      >
        <PanelRight className="h-4 w-4" />
      </ItemsButton>
    </main>
  );
}
