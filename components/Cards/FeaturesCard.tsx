import { FC, ReactElement } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image, { StaticImageData } from "next/image";

import AIImage from "@/public/Features/AI.png";
import Discord from "@/public/Features/discord.png";
import ManageData from "@/public/Features/manageData.png";
import ExportImg from "@/public/Features/export.png";
import ATS from "@/public/Features/ATS.png";
import Dashboard from "@/public/Features/dashboard.png";
import { cn } from "@/lib/utils";

type ImageKey =
  | "discord"
  | "manageData"
  | "AI"
  | "export"
  | "ATS"
  | "dashboard";

const imageMap: Record<ImageKey, StaticImageData> = {
  discord: Discord,
  manageData: ManageData,
  AI: AIImage,
  export: ExportImg,
  dashboard: Dashboard,
  ATS: ATS,
};

interface FeatureCardProps {
  title: string;
  image: ImageKey;
  subheading: ReactElement;
  icon: ReactElement;
  className?: string;
}
const FeaturesCard: FC<FeatureCardProps> = ({
  title,
  image,
  subheading,
  icon,
  className,
}) => {
  return (
    <Card
      className={cn(
        "rounded-2xl shadow-md duration-500 h-auto w-auto transition-all hover:scale-105",
        className
      )}
    >
      <CardHeader className="text-left">
        <CardTitle className="text-2xl font-semibold flex flex-row space-x-4 items-center">
          {icon}
          <span>{title}</span>
        </CardTitle>
        <CardDescription className="text-md">{subheading}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <Image
            src={imageMap[image]}
            quality={70}
            placeholder="blur"
            alt={title}
            className="rounded-md"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturesCard;
