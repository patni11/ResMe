"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "../ui/use-toast";
const GoogleButton = () => {
  const searchParams = useSearchParams()!;
  let callbackUrl = searchParams.get("callbackUrl")!;
  if (callbackUrl === null) {
    callbackUrl = "/";
  }

  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={async () => {
        try {
          await signIn("google", { callbackUrl, redirect: false });
        } catch (e) {
          console.log("There was an error please try again", e);
          toast({
            title: "There was some error, Please try again",
          });
        }
      }}
      className="w-full"
      type="button"
    >
      <Mail className="mr-2 h-4 w-4" />
      <span> Google</span>
    </Button>
  );
};

export default GoogleButton;
