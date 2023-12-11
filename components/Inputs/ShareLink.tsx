"use client";

import { useRef } from "react";
import { toast } from "../ui/use-toast";
import { Input } from "../ui/input";

const ShareLink = ({ url }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const copyToClipboard = () => {
    if (inputRef.current) {
      navigator.clipboard
        .writeText(inputRef.current.value)
        .then(() => {
          // Handle successful copying here, e.g., show a message
          toast({
            title: "URL Copied!",
          });
        })
        .catch((err) => {
          // Handle errors here
          toast({
            title: "Error copying url, try to copy by manually selecting it",
            variant: "destructive",
          });
        });
    }
  };

  return (
    <Input
      value={url}
      readOnly
      className="w-full"
      id="url"
      ref={inputRef}
      onClick={copyToClipboard}
    />
  );
};
