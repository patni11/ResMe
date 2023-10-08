"use client";

import { UserInfo } from "./pageType";

interface TestComponentProps {
  defaultValues: UserInfo;
}

export default function TestComponent({
  // id,
  defaultValues,
}: // location,
// links,
TestComponentProps) {
  //console.log("contact Info", contactInfo);

  return (
    <div>
      {/* <h1>{id || "None"}</h1> */}
      <h1>{defaultValues.displayName || "None"}</h1>
      {defaultValues.contactInfo?.map((contactInfo, idx) => {
        return <h1 key={idx}>{contactInfo.contact} </h1>;
      })}

      <h1>{defaultValues.location}</h1>

      {defaultValues.links
        ? defaultValues.links?.map((links, idx) => {
            return (
              <h1 key={idx}>
                {links.linkName} {links.link}{" "}
              </h1>
            );
          })
        : ""}
      {/* <h1>{defaultValues}</h1> */}
    </div>
  );
}
