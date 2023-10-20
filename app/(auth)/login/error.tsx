"use client";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";

const ErrorToast = () => {
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const errorURI = searchParams.get("error");

  useEffect(() => {
    if (errorURI != "" || errorURI != undefined) {
      const errorMessage = decodeURIComponent(errorURI as string);
      toast({
        title: `${errorMessage}`,
      });
    }
  }, [errorURI]);

  return (
    <>
      <div>There was an error</div>
    </>
  );
};

export default ErrorToast;
