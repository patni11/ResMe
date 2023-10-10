"use client";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
export default function Trash2Button({
  onClick,
  className,
  size,
}: {
  onClick: () => void;
  className?: string;
  size?: "normal" | "small";
}) {
  let trashIconSize = "w-5 h-5";
  let buttonTextSize = "text-sm";
  if (size === "small") {
    trashIconSize = "w-4 h-4";
    buttonTextSize = "text-xs";
  }

  return (
    <Button
      variant="ghost"
      className={cn(
        "text-destructive hover:bg-destructive hover:text-destructive-foreground",
        buttonTextSize,
        className
      )}
      onClick={onClick}
    >
      <Trash2 className={trashIconSize}></Trash2>
    </Button>
  );
}
