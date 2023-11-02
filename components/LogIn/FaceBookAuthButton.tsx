"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
const FaceBook = () => {
  const searchParams = useSearchParams()!;
  let callbackUrl = searchParams.get("callbackUrl")!;
  const { toast } = useToast();
  if (callbackUrl === null) {
    callbackUrl = "/";
  }

  useEffect(() => {
    if (searchParams?.get("error") === "OAuthAccountNotLinked") {
      console.log("ERROR HAPPENED");

      const timeout = setTimeout(() => {
        toast({
          title: "Account Exists!",
          description:
            "You have an account with GitHub, Facebook, or Google. Please try again",
        });
      }, 0);

      return () => clearTimeout(timeout);
    }
  }, [toast, searchParams]);

  return (
    <Button
      variant="outline"
      onClick={() => signIn("facebook", { callbackUrl })}
      className="w-full"
      type="button"
    >
      <Facebook className="mr-2 h-4 w-4" />
      <span> Facebook</span>
      <span></span>
    </Button>
  );
};

export default FaceBook;
