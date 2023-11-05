"use client";

import Trash2Button from "@/components/UIButtons/Trash2Button";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PlusCircleIcon, RefreshCw } from "lucide-react";
import { FC, ReactNode, useState } from "react";

interface FormCardWrapperProps {
  cardTitle: string;
  children?: ReactNode;
  isLoading?: boolean;
  refreshFunction?: () => void;
  hideAll?: boolean;
  deleteFunction?: () => void;
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
}) => {
  return (
    <section className="w-full justify-start">
      <Card className="w-full border-none">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <TrashButton
                hideAll={hideAll}
                deleteFunction={deleteFunction}
                aria-label="Hide"
              />

              {cardTitle}
            </div>
            {refreshFunction && !hideAll ? (
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
