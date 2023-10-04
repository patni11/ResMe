"use client";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
export default function Trash2Button({}: {}) {
  return (
    <Button
      variant="ghost"
      className={
        "text-destructive hover:bg-destructive hover:text-destructive-foreground text-sm"
      }
    >
      <Trash2 className="w-5 h-5"></Trash2>
    </Button>
  );
}
