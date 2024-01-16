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
import { useToast } from "../ui/use-toast";
import * as gtag from "@/lib/gtag";
type feedbackType = "Bug" | "Feature" | "Love";
const DiscordChannels: Record<feedbackType, string> = {
  Bug: "1187124587582984282",
  Feature: "1187126412033916928",
  Love: "1187124766897868810",
};

const FeedbackButton = () => {
  const [buttonState, setButtonState] = useState<feedbackType>("Bug");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [message, setMessage] = useState("");

  const buttonDesign =
    "flex p-2 bg-secondary text-secondary-foreground hover:bg-foreground/20 inline-flex justify-start items-center rounded-md text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const FeedbackButton =
    "p-2 rounded-full text-primary-foreground text-sm px-4 flex justify-center items-center border";

  async function handleSubmit() {
    // setIsLoading(false);

    fetch("https://www.resme.cfd/feedback", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        // Authorization: `Bearer ${process.env.RESME_API_KEY}`,
      },
      body: JSON.stringify({
        discordChannel: DiscordChannels[buttonState],
        buttonState,
        message,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          toast({
            title: "Message Sent",
            description: "Thanks for the feedback",
          });
          console.log("Message sent");
        } else {
          console.log("Error", response);
          toast({
            title: "There was an error",
            description: "please try again later",
            variant: "destructive",
          });
        }
      })
      .catch((error) => {
        console.log("Error", error);
        toast({
          title: "Could not send the mssage",
          description: "We are facing some issues connecting, try again later",
          variant: "destructive",
        });
      });

    setIsLoading(false);
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
              gtag.event({
                clientWindow: window,
                action: "Feedback sent",
                category: "feedback",
                label: { buttonState },
              });
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
