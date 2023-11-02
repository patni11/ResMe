"use client";

import { FC } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
interface DeleteButtonProps {
  deleteFunction: () => void;
}

export const DeleteButton: FC<DeleteButtonProps> = ({ deleteFunction }) => {
  const handleDelete = () => {
    deleteFunction();
    signOut();
  };
  return (
    <Button
      variant="outline"
      className="bg-destructive-foreground text-destructive hover:bg-destructive hover:text-destructive-foreground border-destructive"
      onClick={() => handleDelete()}
    >
      Delete Account
    </Button>
  );
};

interface LogOutButtonProps {}
export const LogOut: FC<LogOutButtonProps> = () => {
  return (
    <Button
      variant="default"
      onClick={() => {
        signOut();
      }}
    >
      Log Out
    </Button>
  );
};
