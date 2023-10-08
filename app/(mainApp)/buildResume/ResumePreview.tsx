"use client";

import DOMPurify from "dompurify";

export default function ResumePreview() {
  const handleInput = (event: React.ChangeEvent<HTMLDivElement>) => {
    const sanitizedHTML = DOMPurify.sanitize(event.currentTarget.innerHTML);
    // Now use sanitizedHTML safely ...
    console.log(sanitizedHTML); // Just for demonstration
  };

  return (
    <main>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mt-16 flow-root sm:mt-24">
          <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <div
              contentEditable="true"
              suppressContentEditableWarning={true}
              onInput={handleInput}
            >
              <p>Some Content1</p>

              <p>Some Content2</p>
              <p>Some Content3</p>
              <p>Some Content4</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
