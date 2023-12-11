"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { deleteFunc, renameResume } from "./ResumeFunctions";
import { useToast } from "../ui/use-toast";
import { DialogClose } from "../ui/dialog";
import LoadingSpinner from "../LoadingSpinner";

export const DeleteButton = ({
  resumeId,
  email,
}: {
  resumeId: string;
  email: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(false);
    }
    setIsLoading(false);
  }

  return (
    <Button
      onClick={() => {
        setIsLoading(true);
        handleDelete();
      }}
      className="w-32 bg-destructive-foreground border hover:bg-destructive outline text-primary hover:text-destructive-foreground"
      disabled={isLoading}
    >
      {isLoading ? <LoadingSpinner /> : <span>Delete</span>}
    </Button>
  );
};

export const RenameDialog = ({ resumeId }: { resumeId: string }) => {
  const [newName, setNewName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
            setIsLoading(true);
            renameResume(resumeId, newName);
            setIsLoading(false);
          }}
          variant="default"
        >
          {isLoading ? <LoadingSpinner /> : <span>Rename</span>}
        </Button>
      </DialogClose>
    </div>
  );
};
