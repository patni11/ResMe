import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactElement } from "react";
import Link from "next/link";
export const PremiumDialog = ({ children }: { children: ReactElement }) => {
  return (
    <Dialog>
      <DialogTrigger className="px-2 py-1.5 text-sm  transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex w-full justify-center text-2xl mb-4">
            <span> Upgrade to </span>
            <span className="text-blue-600"> Premium </span> ✨🌟
          </DialogTitle>
          <DialogDescription className="flex flex-col space-y-12 items-center">
            <span className="text-xl font-bold">Premium Includes</span>

            <div className="flex space-x-12 text-center justify-center items-centers">
              <div className="flex flex-col space-y-12">
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-primary">
                    🤖 ResMe Bot
                  </span>
                  <span> ResMe bot helps you write your resume</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-lg font-bold text-primary">
                    {" "}
                    🔗 Shareable Links
                  </span>
                  <span> Share Live Link to your resume</span>
                </div>
              </div>

              <div className="flex flex-col space-y-12">
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-primary">
                    📝 More Resumes
                  </span>
                  <span> ResMe bot helps you write your resume</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-lg font-bold text-primary">
                    📑 Download Docx
                  </span>
                  <span> Share Live Link to your resume</span>
                </div>
              </div>
            </div>

            <Link
              href="/pricing"
              className={`border border-2 font-semibold border-blue-600 hover:bg-blue-600 text-primary hover:text-primary-foreground px-3 py-2 rounded-lg`}
            >
              Upgrade Now
            </Link>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
