"use client";
import * as gtag from "@/lib/gtag";
import { onboardUser } from "@/lib/actions/user.actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChevronRight, ChevronLeft } from "lucide-react";
export const SetUpLater = () => {
  const router = useRouter();
  return (
    <Button
      variant="link"
      onClick={async () => {
        gtag.event({
          clientWindow: window,
          action: "Setup Later Later",
          category: "Onboarding",
          label: "Setup Later",
        });
        await onboardUser("/dashboard");
        router.push("/dashboard");
      }}
    >
      Set up Later
    </Button>
  );
};

export const GoBack = ({ page }: { page: string }) => {
  const router = useRouter();
  return (
    <Button
      size="icon"
      className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
      onClick={() => {
        router.push(page);
      }}
    >
      <ChevronLeft className="h-5 w-5" />{" "}
    </Button>
  );
};

export const GoForward = ({
  page,
  completeOnboard,
}: {
  page: string;
  completeOnboard?: Boolean;
}) => {
  const router = useRouter();
  return (
    <Button
      size="icon"
      className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
      onClick={async () => {
        if (completeOnboard) {
          gtag.event({
            clientWindow: window,
            action: "OnBoard Complete",
            category: "Onboarding",
            label: "OnBoard Complete",
          });
          await onboardUser();
        }

        router.push(page);
      }}
    >
      <ChevronRight className="h-5 w-5" />{" "}
    </Button>
  );
};
