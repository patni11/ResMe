import Colorful from "@uiw/react-color-colorful";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { buttonVariants } from "../ui/button";

export function ColorPicker({
  color,
  setColor,
}: {
  color: string;
  setColor: (newColor: string) => void;
}) {
  return (
    <Dialog>
      <DialogTrigger className="rounded-full">
        <div
          className={buttonVariants({
            className:
              "rounded-full border border-black w-6 h-6 border-2 shadow-outline rounded-full",
            size: "icon",
            variant: "ghost",
          })}
          style={{
            backgroundColor: color,
          }}
        />
      </DialogTrigger>
      <DialogContent>
        <Colorful
          color={color}
          onChange={(newColor: any) => {
            console.log("NEW COLOR", newColor);
            setColor(newColor.hex);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
