// components/Popup.tsx
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogTrigger,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
const Popup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const closeDialog = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supercharge your job search with Premium</DialogTitle>
          <DialogDescription>
            Various features and pricing plans, testimonials from users, and
            call-to-action button.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button
            onClick={closeDialog}
            className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Get Started!
          </button>
          <DialogClose asChild>
            <button
              onClick={closeDialog}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
