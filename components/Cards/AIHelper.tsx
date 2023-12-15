"use client";
import { Button, buttonVariants } from "../ui/button";
import { Sparkles } from "lucide-react";
import { generateBulletList } from "@/lib/actions/openai.action";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { updateUserAICalls } from "@/lib/actions/user.actions";
import { StreamingTextResponse } from "ai";
import { UnauthorizedError } from "@/lib/types";
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

        try {
          const stream = await generateBulletList(userMessage || "");
          if (!stream) {
            toast({
              title:
                "There was an error getting response from AI, please try again",
              variant: "destructive",
            });
          }
          // TODO: The part on openAI API side is done, I've no idea about this part will do it later, comming it and rolling back main
          const reader = stream.body.getReader();

          const cleanedString = response.message.replace(/ *- */g, "");
          setMessage(cleanedString);

          await updateUserAICalls();

          setIsLoading(false);
        } catch (e: any) {
          if (e instanceof Error) {
            toast({
              title: e.name,
              description: e.message,
              variant: "destructive",
            });
            setIsLoading(false);
            return;
          }
        }
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
