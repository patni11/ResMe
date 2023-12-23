import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactElement } from "react";

export const SectionWrapper = ({
  title,
  children,
  contentSize,
}: {
  title: string;
  children: ReactElement;
  contentSize?: string;
}) => {
  return (
    <Card className="">
      <CardHeader className="">
        <Accordion type="single" collapsible className="">
          <AccordionItem value="item-1" className="">
            <AccordionTrigger className=" hover:no-underline">
              <CardTitle>{title}</CardTitle>
            </AccordionTrigger>
            <AccordionContent>
              <CardContent className={cn("p-0 overflow-y-auto", contentSize)}>
                {children}
              </CardContent>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardHeader>
    </Card>
  );
};
