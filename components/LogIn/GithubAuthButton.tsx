"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const GithubAuthButton = () => {
  const searchParams = useSearchParams()!;
  let callbackUrl = searchParams.get("callbackUrl")!;

  if (callbackUrl === null) {
    callbackUrl = "/";
  }

  return (
    <Button
      variant="outline"
      onClick={() => signIn("github", { callbackUrl })}
      className="w-full"
      type="button"
    >
      <Github className="mr-2 h-4 w-4" />
      <span> GitHub</span>
      <span></span>
    </Button>
  );
};

export default GithubAuthButton;
