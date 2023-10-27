"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

const FaceBook = () => {
  const searchParams = useSearchParams()!;
  let callbackUrl = searchParams.get("callbackUrl")!;

  if (callbackUrl === null) {
    callbackUrl = "/";
  }

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
