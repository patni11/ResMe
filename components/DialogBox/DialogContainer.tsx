"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FC, ReactNode } from "react";

interface DialogContainerProps {
  children?: ReactNode;
  className?: string;

  dialogDetails: {
    title: string;
    description?: string;
  };
  dialogTrigger: ReactNode;
}

export const DialogContainer: FC<DialogContainerProps> = ({
  children,
  dialogDetails,
  dialogTrigger,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>{dialogDetails.title}</DialogTitle>
          <DialogDescription>{dialogDetails?.description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
