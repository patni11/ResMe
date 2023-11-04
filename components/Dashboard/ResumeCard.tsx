import Image from "next/image";
import { cn } from "@/lib/utils";
import { Settings2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ResumeCardImage from "@/public/resumeCard.png";
import Link from "next/link";

import { DeleteButton, RenameDialog } from "./ResumeFuncitonButtons";
import { Button } from "../ui/button";

//import { useToast } from "../ui/use-toast";
interface ResumeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  resumeName: string;
  resumeId: string;
  email: string;
  updatedAt: string;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

async function renameFunc(resumeId: string, newName: string) {
  "use server";
  console.log("called rename function", resumeId, newName);
  // rename in server
  //revalidate path or tag to update
}

export async function ResumeCard({
  resumeName,
  resumeId,
  updatedAt,
  email,
  aspectRatio = "portrait",
  width,
  height,
  className,
}: ResumeCardProps) {
  //const { toast } = useToast();
  return (
    <div className={cn("space-y-3", className)}>
      <Link key={resumeId} href={`/buildResume/${resumeId}`}>
        <div className="overflow-hidden rounded-md">
          <Image
            src={ResumeCardImage}
            alt={resumeName}
            width={width}
            height={height}
            className={cn(
              "h-auto w-auto object-cover transition-all hover:scale-105",
              aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
            )}
          />
        </div>
      </Link>

      <div className="space-y-1 text-sm flex justify-between w-full align-center">
        <div className="flex flex-col">
          <h3 className="font-medium leading-none">{resumeName}</h3>
          <p className="text-xs text-muted-foreground">{updatedAt}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Settings2 className="h-4 w-4"></Settings2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{resumeName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Dialog>
                <DialogTrigger className="px-2 py-1.5 text-sm  transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                  <Button
                    //onClick={() => renameFunc(resumeId, "Shubh Patni")}
                    variant="outline"
                    className="w-full"
                  >
                    Rename
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Rename Resume</DialogTitle>
                    <DialogDescription className="flex flex-col space-y-4 items-center">
                      <RenameDialog resumeId={resumeId} />
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Dialog>
                <DialogTrigger className="px-2 py-1.5 text-sm  transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                  <Button
                    //onClick={() => renameFunc(resumeId, "Shubh Patni")}
                    variant="outline"
                    className="w-full"
                  >
                    Delete
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription className="flex flex-col space-y-4 items-center">
                      <span>
                        This action cannot be undone. This will permanently
                        delete your Resume
                      </span>

                      <DeleteButton resumeId={resumeId} email={email} />
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
