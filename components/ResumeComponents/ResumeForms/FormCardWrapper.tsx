"use client";

import Trash2Button from "@/components/UIButtons/Trash2Button";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PlusCircleIcon } from "lucide-react";
import { FC, ReactNode, useState } from "react";

interface FormCardWrapperProps {
  className?: string;
  cardTitle: string;
  children?: ReactNode;
}

export const FormCardWrapper: FC<FormCardWrapperProps> = ({
  className,
  cardTitle,
  children,
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
              />
            ) : (
              <Button
                onClick={() => setShowChild(true)}
                className="mr-2"
                variant="ghost"
              >
                <PlusCircleIcon className="h-5 w-5" />
              </Button>
            )}

            {cardTitle}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {showChild ? <div>{children}</div> : <div></div>}
        </CardContent>
      </Card>
    </section>
  );
};
