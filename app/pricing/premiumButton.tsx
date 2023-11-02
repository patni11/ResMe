import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
export const GoPremium = () => {
  return (
    <Dialog>
      <DialogTrigger className="px-2 py-1.5 text-sm  transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full">
        <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500">
          Go Premium
        </Button>
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
