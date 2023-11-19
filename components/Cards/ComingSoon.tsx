import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactElement } from "react";
import { buttonVariants } from "../ui/button";
import Link from "next/link";

export const ComingSoon = ({ children }: { children: ReactElement }) => {
  return (
    <Dialog>
      <DialogTrigger className=" text-sm  transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex w-full justify-center">
            Coming Soon! 😄
          </DialogTitle>
          <DialogDescription className="flex flex-col space-y-4 items-center">
            <span>
              We are currently working on it, Follow us to stay updated!
            </span>
            <Link
              href="https://twitter.com/resmexyz"
              className={`${buttonVariants({
                variant: "outline",
              })}`}
            >
              Follow
            </Link>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
