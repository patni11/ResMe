import { Button } from "../ui/button";
import { Wand2 } from "lucide-react";
import { ComingSoon } from "./ComingSoon";
export const AIHelper = () => {
  return (
    <ComingSoon>
      <span className="bg-muted border-blue-600 hover:bg-blue-600 text-primary hover:text-primary-foreground">
        <Wand2 className="w-4 h-4" />
      </span>
    </ComingSoon>
  );
};
