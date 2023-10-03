import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface PanelProps {
  className?: string;
  children: ReactNode;
}

const Panel: FC<PanelProps> = ({ className, children }) => {
  return (
    <section className={cn("flex flex-col px-12 pt-10", className)}>
      {children}
    </section>
  );
};

export default Panel;
