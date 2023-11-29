import { cn } from "@/lib/utils";
import Image from "next/image";
export default function HomeBG({ className }: { className?: string }) {
  return (
    <Image
      className={cn("absolute z-0", className)}
      layout="fill"
      objectFit="cover"
      src="/pattern-randomized.svg"
      alt="Bakground img"
    />
  );
}
