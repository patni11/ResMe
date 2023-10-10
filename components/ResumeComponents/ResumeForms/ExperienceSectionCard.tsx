"use client";
import { FC, useState } from "react";
import { FormCardWrapper } from "./FormCardWrapper";

import { HideButtons } from "@/components/UIButtons/HideButtons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, Trash2 } from "lucide-react";
interface ExperienceSectionCard {}

export const ExperienceSectionCard: FC<ExperienceSectionCard> = ({}) => {
  return (
    <FormCardWrapper cardTitle="Experience">
      <ExperienceCard></ExperienceCard>
      <ExperienceCard></ExperienceCard>
    </FormCardWrapper>
  );
};

const ExperienceCard = () => {
  const [hidePosition, setHidePosition] = useState(false);
  return (
    <div className="flex flex-col w-full bg-secondary p-4 rounded-lg mb-2">
      <div className="flex flex-col w-full text-md">
        <h1 className="font-semibold"> Researcher </h1>
        <div className="flex justify-between w-full items-center">
          <h1 className="text-sm">DAO Maker</h1>
          <HideButtons
            hide={hidePosition}
            setHide={() => setHidePosition(!hidePosition)}
          >
            <span>Hide Position</span>
          </HideButtons>
        </div>
      </div>

      <ul className="flex w-full my-2">
        <li className="flex space-x-4 w-full">
          <Input className="w-full"></Input>
          <Button variant="ghost" className="hover:text-destructive">
            <Trash2 className="w-4 h-4"></Trash2>
          </Button>
        </li>
      </ul>
      <Button
        className="mr-2 text-xs w-12 hover:bg-primary hover:text-primary-foreground"
        variant="ghost"
      >
        <PlusCircleIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};
