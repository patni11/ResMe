"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { testResumeInfo } from "@/store/testHeaderInfo";
import { FC } from "react";

type testResumeInfoProp = {
  resumeId: string;
};
export const TestResumeHeader: FC<testResumeInfoProp> = ({ resumeId }) => {
  const store = testResumeInfo((resumeId = resumeId));
  const { displayName, updateDisplayName } = store();

  return (
    <div>
      <Label>Your Name</Label>
      <Input
        placeholder="Enter your name"
        value={displayName}
        onChange={(e) => {
          updateDisplayName(e.currentTarget.value);
        }}
      ></Input>

      <button> Submit </button>
    </div>
  );
};
