import { Settings2 } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
export default function Settings2Button({ className }: { className?: string }) {
  return (
    <Button variant="ghost" className={cn("", className)}>
      <Settings2 className="w-5 h-5"></Settings2>
    </Button>
  );
}
