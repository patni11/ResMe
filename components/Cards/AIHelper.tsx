"use client";
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";
import { generateBulletList } from "@/lib/actions/openai.action";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { updateUserAICalls } from "@/lib/actions/user.actions";
import { absoluteUrl } from "@/lib/utils";
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

  const handleButtonClick = async () => {
    setIsLoading(true);
    try {
      const timeout = setTimeout(() => {
        toast({
          title: "This is taking longer than expected...",
        });
      }, 6000);

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
          description: (
            <Button
              variant="outline"
              className="w-full border border-blue-600 font-semibold text-blue-600 hover:bg-blue-600 hover:text-white"
              onClick={() => {
                window.location.href = absoluteUrl("/pricing");
              }}
            >
              Upgrade
            </Button>
          ),
        });

        setIsLoading(false);
        return;
      }
      await updateUserAICalls();

      const cleanedString = response.message.replace(/ *- */g, "");
      setMessage(cleanedString);

      clearTimeout(timeout);
    } catch (e) {
      console.log("AI Helped Error", e);
      toast({
        title: "There was some error, please try again",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <Button
      onClick={handleButtonClick}
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
