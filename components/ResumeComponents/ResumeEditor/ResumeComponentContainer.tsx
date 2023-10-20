"use client";

import DOMPurify from "dompurify";
import { ReactNode } from "react";

export default function ResumeComponentContainer({
  children,
}: {
  children: ReactNode;
}) {
  const handleInput = (event: React.ChangeEvent<HTMLDivElement>) => {
    const sanitizedHTML = DOMPurify.sanitize(event.currentTarget.innerHTML);
    // Now use sanitizedHTML safely ...
    console.log(sanitizedHTML); // Just for demonstration
  };

  return (
    <div
      contentEditable="true"
      suppressContentEditableWarning={true}
      onInput={handleInput}
    >
      {children}
    </div>
  );
}