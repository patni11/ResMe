"use client";

import Trash2Button from "@/components/UIButtons/Trash2Button";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ChevronDown,
  ChevronUp,
  PlusCircleIcon,
  RefreshCw,
} from "lucide-react";
import { FC, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface FormCardWrapperProps {
  cardTitle: string;
  children?: ReactNode;
  isLoading?: boolean;
  refreshFunction?: () => void;
  hideAll?: boolean;
  deleteFunction?: () => void;
  index: number;
  moveUp: (index: number) => void;
  moveDown: (index: number) => void;
}

interface TrashButtonProps {
  hideAll: boolean;
  deleteFunction?: () => void;
}

const TrashButton: FC<TrashButtonProps> = ({
  hideAll = false,
  deleteFunction,
}) => {
  if (!deleteFunction) return null;
  return (
    <>
      {!hideAll ? (
        <Trash2Button
          className="mr-2"
          onClick={() => deleteFunction()}
          size="small"
        />
      ) : (
        <Button
          onClick={() => deleteFunction()}
          className="mr-2"
          variant="ghost"
        >
          <PlusCircleIcon className="h-4 w-4" />
        </Button>
      )}
    </>
  );
};

export const FormCardWrapper: FC<FormCardWrapperProps> = ({
  cardTitle,
  children,
  refreshFunction,
  isLoading,
  hideAll = false,
  deleteFunction,
  index,
  moveUp,
  moveDown,
}) => {
  return (
    <section className="w-full justify-start">
      <Card className="w-full border-none">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex flex-col mr-2">
                {index != 0 ? (
                  <button
                    className="hover:bg-secondary rounded-lg p-1"
                    onClick={() => moveUp(index)}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                ) : null}
                {index != 5 ? (
                  <button
                    className="hover:bg-secondary rounded-lg p-1"
                    onClick={() => moveDown(index)}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                ) : null}
              </div>
              <TrashButton
                hideAll={hideAll}
                deleteFunction={deleteFunction}
                aria-label="Hide"
              />

              {cardTitle}
            </div>
            {refreshFunction && !hideAll ? (
              <div className="flex items-center justify-center">
                <Dialog>
                  <DialogTrigger>
                    <div
                      className={buttonVariants({
                        variant: "ghost",
                        className: "mr-2",
                        size: "xs",
                      })}
                      aria-label="Refresh"
                    >
                      Reset
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Reset To Profile</DialogTitle>
                      <DialogDescription className="flex flex-col space-y-4 items-center">
                        <span>
                          This will reset the fields to your default profile
                          settings
                        </span>

                        <Button
                          onClick={() => {
                            hideAll = false;

                            refreshFunction();
                          }}
                          className="mr-2"
                          variant="default"
                          aria-label="Refresh"
                          disabled={isLoading}
                        >
                          Reset
                        </Button>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>

                <Button
                  onClick={() => {
                    hideAll = false;
                    refreshFunction();
                  }}
                  className="mr-2"
                  variant="ghost"
                  aria-label="Refresh"
                  disabled={isLoading}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div></div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>{!hideAll ? <div>{children}</div> : null}</CardContent>
      </Card>
    </section>
  );
};
