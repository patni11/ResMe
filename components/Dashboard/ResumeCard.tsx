import Image from "next/image";
import { cn } from "@/lib/utils";
import { Album } from "../data/albums";
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
import { Button } from "../ui/button";
interface ResumeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  album: Album;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
  deleteFunc: () => {};
  renameFunc: () => {};
}

export function ResumeCard({
  album,
  aspectRatio = "portrait",
  width,
  height,
  className,
  deleteFunc,
  renameFunc,
}: ResumeCardProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="overflow-hidden rounded-md">
        <Image
          src={album.cover}
          alt={album.name}
          width={width}
          height={height}
          className={cn(
            "h-auto w-auto object-cover transition-all hover:scale-105",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
        />
      </div>

      <div className="space-y-1 text-sm flex justify-between w-full align-center">
        <div className="flex flex-col">
          <h3 className="font-medium leading-none">{album.name}</h3>
          <p className="text-xs text-muted-foreground">{album.artist}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Settings2 className="h-4 w-4"></Settings2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{album.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <button
                onClick={renameFunc}
                className="hover:text-destructive hover:text-semibold w-full cursor-pointer"
              >
                Rename
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Dialog>
                <DialogTrigger className="px-2 py-1.5 text-sm  transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                  <span>Delete</span>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                    <DialogDescription className="flex flex-col space-y-4 items-center">
                      <span>
                        This action cannot be undone. This will permanently
                        delete your Resume
                      </span>
                      <Button
                        onClick={deleteFunc}
                        className="w-32 bg-destructive-foreground border hover:bg-destructive outline text-primary hover:text-destructive-foreground"
                      >
                        {" "}
                        Delete{" "}
                      </Button>
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
