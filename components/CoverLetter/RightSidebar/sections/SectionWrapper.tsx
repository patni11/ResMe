import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactElement } from "react";

export const SectionWrapper = ({
  title,
  children,
  description,
  contentSize,
}: {
  title: string;
  children: ReactElement;
  description?: string;
  contentSize?: string;
}) => {
  return (
    <Card>
      <CardHeader>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className=" hover:no-underline">
              <CardTitle>{title}</CardTitle>
            </AccordionTrigger>
            <AccordionContent className="border-none">
              <CardDescription className="mb-2">{description}</CardDescription>
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
