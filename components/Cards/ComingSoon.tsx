import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactElement } from "react";
//import { buttonVariants } from "../ui/button";
//import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
export const ComingSoon = ({
  children,
  className,
}: {
  children: ReactElement;
  className?: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          "text-sm transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          className
        )}
      >
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex w-full justify-center">
            Coming Soon! 😄
          </DialogTitle>
          <DialogDescription className="flex flex-col space-y-4 items-center">
            <span>
              We are launching Premium on 16th December (tentatively) Please
              support us on Product Hunt 😊
            </span>
            <a
              href="https://www.producthunt.com/products/resme"
              target="_blank"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=427885&theme=light"
                alt="ResMe - Create&#0032;Professional&#0032;resumes&#0032;in&#0032;seconds | Product Hunt"
                // style={{"width: 250px; height: 54px;"}}
                width="250"
                height="54"
              />
            </a>
            {/* <Link
              href="https://twitter.com/resmexyz"
              className={`${buttonVariants({
                variant: "outline",
              })}`}
            >
              Follow
            </Link> */}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
