import { Button } from "../ui/button";
import { Wand2 } from "lucide-react";
export const AIHelper = () => {
  return (
    <Button className="bg-muted border-blue-600 hover:bg-blue-600 text-primary hover:text-primary-foreground">
      <Wand2 className="w-4 h-4" />
    </Button>
  );
};
