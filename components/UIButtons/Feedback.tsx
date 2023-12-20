"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Bug, Heart, MessageCircle, Sparkle } from "lucide-react";
import { Button } from "../ui/button";
import { DialogHeader } from "../ui/dialog";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import LoadingSpinner from "../LoadingSpinner";
type feedbackType = "Bug" | "Feature" | "Love";

const FeedbackButton = () => {
  const [buttonState, setButtonState] = useState<feedbackType>("Bug");
  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState("");

  const buttonDesign =
    "flex p-2 bg-secondary text-secondary-foreground hover:bg-foreground/20 inline-flex justify-start items-center rounded-md text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const FeedbackButton =
    "p-2 rounded-full text-primary-foreground text-sm px-4 flex justify-center items-center border";

  function handleSubmit() {
    // setIsLoading(false);
    setTimeout(() => {
      setIsLoading(false);
      console.log("Sending Message");
    }, 2000);
  }

  return (
    <Dialog>
      <DialogTrigger className="">
        <div
          className={`${buttonDesign} text-blue-600 w-full border border-input rounded-md`}
        >
          <MessageCircle absoluteStrokeWidth />

          <span className="ml-2">Feedback</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center mb-4 text-xl font-semibold">
            Feedback
          </DialogTitle>
          <DialogDescription className="text-md font-semibold">
            Let us know if you faced any bugs, want any feautres, or just loved
            the product :)
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-4 justify-center items-cennter  my-4">
            <button
              className={cn(
                FeedbackButton,
                buttonState === "Bug"
                  ? "bg-[#FF270A] shadow-lg"
                  : "bg-[#FF6F5C]"
              )}
              onClick={() => setButtonState("Bug")}
            >
              <Bug className="mr-2 h-4 w-4" /> Bug
            </button>
            <button
              className={cn(
                FeedbackButton,
                buttonState === "Feature"
                  ? "bg-[#5A3FDE] shadow-lg"
                  : "bg-[#9685EA]"
              )}
              onClick={() => setButtonState("Feature")}
            >
              <Sparkle className="mr-2 h-4 w-4" /> Feature
            </button>
            <button
              className={cn(
                FeedbackButton,
                buttonState === "Love"
                  ? "bg-[#34E000] shadow-lg"
                  : "bg-[#26A300]"
              )}
              onClick={() => setButtonState("Love")}
            >
              <Heart className="mr-2 h-4 w-4" /> Love
            </button>
          </div>
          <Textarea
            placeholder="Type your message here."
            value={message}
            onChange={(e) => {
              setMessage(e.currentTarget.value);
            }}
          />

          <Button
            onClick={(e) => {
              e.preventDefault();
              setIsLoading(true);
              handleSubmit();
            }}
          >
            {isLoading ? <LoadingSpinner /> : <span>Submit</span>}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackButton;
