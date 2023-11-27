"use client";
import { Button } from "../ui/button";
import { Sparkles, Wand2 } from "lucide-react";
import { generateBulletList } from "@/lib/actions/openai.action";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { fetchUser, updateUserAICalls } from "@/lib/actions/user.actions";
import { PLANS } from "@/app/utils/stripe";
export const AIHelper = ({
  userMessage,
  setMessage,
}: {
  userMessage?: string;
  setMessage: (message: string) => void;
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      onClick={async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const response = await generateBulletList(userMessage || "");
        if (response.code === "error" || response.code === "limitExceeded") {
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
