import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface LightTextProps {}

const LightText: FC<LightTextProps> = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <span
      className={cn("text-muted-foreground ml-2 font-light text-sm", className)}
    >
      {children}
    </span>
  );
};

export default LightText;
