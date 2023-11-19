"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { deleteFunc, renameResume } from "./ResumeFunctions";
import { useToast } from "../ui/use-toast";
import { DialogClose } from "../ui/dialog";

export const DeleteButton = ({
  resumeId,
  email,
}: {
  resumeId: string;
  email: string;
}) => {
  const { toast } = useToast();

  async function handleDelete() {
    const res = await deleteFunc(resumeId, email);
    if (res.isSuccess) {
      localStorage.removeItem(`certificates-${email}-${resumeId}`);
      localStorage.removeItem(`resumeHeader-${email}-${resumeId}`);
      localStorage.removeItem(`educations-${email}-${resumeId}`);
      localStorage.removeItem(`experiences-${email}-${resumeId}`);
      localStorage.removeItem(`projects-${email}-${resumeId}`);
      localStorage.removeItem(`talents-${email}-${resumeId}`);

      toast({
        title: `Resume Deleted Successfully`,
      });

      location.reload();
    } else {
      toast({
        title: `Could not delete the resume`,
      });
    }
  }

  return (
    <Button
      onClick={() => handleDelete()}
      className="w-32 bg-destructive-foreground border hover:bg-destructive outline text-primary hover:text-destructive-foreground"
    >
      {" "}
      Delete{" "}
    </Button>
  );
};

export const RenameDialog = ({ resumeId }: { resumeId: string }) => {
  const [newName, setNewName] = useState("");

  return (
    <div className="w-full flex flex-col space-y-4 mt-8">
      <Input
        value={newName}
        onChange={(e) => {
          setNewName(e.currentTarget.value);
        }}
        placeholder="Enter New Name"
      />
      <DialogClose asChild>
        <Button
          onClick={() => {
            renameResume(resumeId, newName);
          }}
          variant="default"
        >
          Rename
        </Button>
      </DialogClose>
    </div>
  );
};
