"use client";
import { Button } from "@/components/ui/button";
import * as gtag from "@/lib/gtag";
const GoPremiumButton = () => {
  const clickTracking: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    gtag.event({
      clientWindow: window,
      action: "go premium button",
      category: "purchase",
      label: "premium",
    });
  };
  return (
    <Button
      className="w-full bg-gradient-to-r from-pink-500 to-purple-500"
      onClick={clickTracking}
    >
      Go Premium
    </Button>
  );
};
export default GoPremiumButton;
