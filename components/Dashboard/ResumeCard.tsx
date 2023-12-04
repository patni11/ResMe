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
import { ResumeCardImageComponent } from "./ResumeCardImg";
import { DeleteButton, RenameDialog } from "./ResumeFuncitonButtons";
import { buttonVariants } from "../ui/button";
import { Input } from "../ui/input";
import ResumeCardImageImage from "@/public/resumeCard.png";

//import { useToast } from "../ui/use-toast";
interface ResumeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  resumeName: string;
  resumeId: string;
  email: string;
  updatedAt: string;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
  pdfLink?: string;
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
  pdfLink,
}: ResumeCardProps) {
  //const { toast } = useToast();
  return (
    <div className={cn("space-y-1", className)}>
      <ResumeCardImageComponent
        resumeName={resumeName}
        resumeId={resumeId}
        email={email}
        image={ResumeCardImageImage}
        aspectRatio={aspectRatio}
        width={width}
        height={height}
      />
      {/* <Link key={resumeId} href={`/buildResume/${resumeId}`}>
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
            priority={true}
          />
        </div>
      </Link> */}

      <div className="text-sm flex justify-between w-full align-center m-0">
        <div className="flex flex-col">
          <h3 className="font-medium leading-none">{resumeName}</h3>
          <p className="text-xs text-muted-foreground">{updatedAt}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="hover:bg-secondary p-2 rounded-md">
            <Settings2 className="h-4 w-4" aria-label="Modify"></Settings2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{resumeName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Dialog>
                <DialogTrigger className="px-2 py-1.5 text-sm  transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                  <div
                    className={buttonVariants({
                      variant: "outline",
                      className: "w-full",
                    })}
                  >
                    Rename
                  </div>
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
                  <div
                    className={buttonVariants({
                      variant: "outline",
                      className: "w-full",
                    })}
                  >
                    Delete
                  </div>
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

            <DropdownMenuItem asChild>
              <Dialog>
                <DialogTrigger className="px-2 py-1.5 text-sm  transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                  <div
                    //onClick={() => renameFunc(resumeId, "Shubh Patni")}

                    className={buttonVariants({
                      variant: "outline",
                      className: "w-full",
                    })}
                  >
                    Copy Link
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Share Link</DialogTitle>
                    <DialogDescription className="flex flex-col space-y-4 items-center">
                      {pdfLink || pdfLink != "" ? (
                        <Input
                          value={`https://utfs.io/f/${pdfLink}`}
                          readOnly
                        />
                      ) : (
                        <span>
                          You don&apos;t have any links generated yet, open
                          resume, copy link and next time you can copy from here
                          😉
                        </span>
                      )}
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
