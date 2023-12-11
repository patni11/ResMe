"use client";

import { ReactElement, useRef } from "react";
import { toast } from "../ui/use-toast";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";

const ShareLink = ({
  url,
  children,
}: {
  url: string;

  children: ReactElement;
}) => {
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
    <Dialog>
      <DialogTrigger className="px-2 py-1.5 text-sm  transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Share Link</DialogHeader>

        <Input
          value={url}
          readOnly
          className="w-full"
          id="url"
          ref={inputRef}
          onClick={copyToClipboard}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ShareLink;
