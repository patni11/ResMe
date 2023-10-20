"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const GoogleButton = () => {
  const searchParams = useSearchParams()!;
  let callbackUrl = searchParams.get("callbackUrl")!;

  if (callbackUrl === null) {
    callbackUrl = "/";
  }

  return (
    <Button
      variant="outline"
      onClick={() => signIn("google", { callbackUrl })}
      className="w-full"
      type="button"
    >
      <Mail className="mr-2 h-4 w-4" />
      <span> Google</span>
      <span></span>
    </Button>
  );
};

export default GoogleButton;
