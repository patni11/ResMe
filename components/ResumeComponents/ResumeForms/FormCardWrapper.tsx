"use client";

import Trash2Button from "@/components/UIButtons/Trash2Button";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PlusCircleIcon, RefreshCw } from "lucide-react";
import { FC, ReactNode, useState } from "react";

interface FormCardWrapperProps {
  className?: string;
  cardTitle: string;
  children?: ReactNode;
  refreshFunction?: () => void;
}

export const FormCardWrapper: FC<FormCardWrapperProps> = ({
  className,
  cardTitle,
  children,
  refreshFunction,
}) => {
  const [showChild, setShowChild] = useState(true);

  return (
    <section className="w-full justify-start">
      <Card className="w-full border-none">
        <CardHeader>
          <CardTitle className="flex items-center ">
            {showChild ? (
              <Trash2Button
                className="mr-2"
                onClick={() => setShowChild(false)}
                size="small"
              />
            ) : (
              <Button
                onClick={() => setShowChild(true)}
                className="mr-2"
                variant="ghost"
              >
                <PlusCircleIcon className="h-4 w-4" />
              </Button>
            )}

            {cardTitle}
            {refreshFunction ? (
              <Button
                onClick={() => refreshFunction()}
                className="mr-2"
                variant="ghost"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            ) : null}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {showChild ? <div>{children}</div> : <div></div>}
        </CardContent>
      </Card>
    </section>
  );
};
