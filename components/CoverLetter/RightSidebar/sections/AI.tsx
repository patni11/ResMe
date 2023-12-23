"use client";
import { SectionWrapper } from "./SectionWrapper";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { AIHelper } from "@/components/Cards/AIHelper";
const AI = () => {
  const [inputText, setInputText] = useState("");

  return (
    <>
      <SectionWrapper title="AI">
        <div className="w-full flex flex-col">
          <Textarea placeholder="Type your message here." />
          <AIHelper
            userMessage={inputText}
            setMessage={(message: string) => {
              setInputText(message);
            }}
          />
        </div>
      </SectionWrapper>
    </>
  );
};

export default AI;
