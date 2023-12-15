"use client";
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";
import { generateBulletList } from "@/lib/actions/openai.action";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { updateUserAICalls } from "@/lib/actions/user.actions";
//import { ComingSoon } from "./ComingSoon";

export const AIHelper = ({
  userMessage,
  setMessage,
}: {
  userMessage?: string;
  setMessage: (message: string) => void;
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // return (
  //   <ComingSoon>
  //     <div
  //       className={buttonVariants({
  //         variant: "outline",
  //         size: "icon",
  //         className:
  //           " text-blue-600  hover:bg-blue-600 hover:text-primary-foreground bg-transparent",
  //       })}
  //     >
  //       <Sparkles className="w-4 h-4" />
  //     </div>
  //   </ComingSoon>
  // );

  return (
    <Button
      onClick={async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const response = await generateBulletList(userMessage || "");
        if (response.code === "error") {
          toast({
            title: response.message,
          });
          setIsLoading(false);
          return;
        }

        if (response.code === "limitExceeded") {
          toast({
            title: response.message,
          });

          setIsLoading(false);
          return;
        }

        const cleanedString = response.message.replace(/ *- */g, "");
        setMessage(cleanedString);

        await updateUserAICalls();

        setIsLoading(false);
      }}
      type="button"
      variant="outline"
      size="icon"
      disabled={isLoading}
      className=" text-blue-600  hover:bg-blue-600 hover:text-primary-foreground bg-transparent"
    >
      {isLoading ? <LoadingSpinner /> : <Sparkles className="w-4 h-4" />}
    </Button>
  );
};
