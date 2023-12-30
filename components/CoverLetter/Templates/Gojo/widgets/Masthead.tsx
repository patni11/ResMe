"use client";

import clsx from "clsx";
import { createCoverLetterSettings } from "@/store/coverLetter/settings";
import { createCoverLetterData } from "@/store/coverLetter/data";
import ContentEditable from "react-contenteditable";
import { convertTimestampToDate } from "@/lib/utils";
import { Globe, Mail, MapPin, Phone } from "lucide-react";

export const MastheadSidebar: React.FC = () => {
  const useSettings = createCoverLetterSettings("1");
  const { bgColor, fontFamily, fontSize, headerSize } = useSettings();
  const useCoverLetterData = createCoverLetterData("1");
  const { userData, jobDescription, changeData } = useCoverLetterData();
  const iconClass = `h-5 w-5 mr-2`;
  const textContainerStyle: React.CSSProperties = {
    display: "inline-block",
    alignItems: "center", // Corresponds to 'items-center
    textAlign: "left", // Corresponds to 'text-left'
  };
  return (
    <div
      className={clsx("flex flex-col space-y-12 p-4")}
      style={{
        fontFamily: fontFamily,
        color: bgColor,
        fontSize: parseInt(fontSize),
      }}
    >
      <div className="flex flex-col space-y-1">
        <ContentEditable
          html={userData.name}
          disabled={false}
          style={{ fontSize: parseInt(headerSize) }}
          onChange={(e) => {
            changeData({
              field: "userData",
              value: {
                ...userData,
                name: e.target.value,
              },
            });
          }}
        />

        <ContentEditable
          html={jobDescription}
          disabled={false}
          style={{ fontSize: (headerSize * 3) / 4 }}
          className="opacity-80"
          onChange={(e) => {
            changeData({
              field: "jobDescription",
              value: e.target.value,
            });
          }}
        />
      </div>
      <div className="flex flex-col space-y-4">
        {userData.email.length > 0 ? (
          <div style={{ display: "flex" }}>
            <ContentEditable
              html={`Email: ${userData.email}`}
              disabled={false}
              onChange={(e) => {
                changeData({
                  field: "userData",
                  value: {
                    ...userData,
                    email: e.target.value,
                  },
                });
              }}
            />
          </div>
        ) : null}

        {userData.phone.length > 0 ? (
          <div style={{ display: "flex" }}>
            <ContentEditable
              html={`Phone: ${userData.phone}`}
              disabled={false}
              onChange={(e) => {
                changeData({
                  field: "userData",
                  value: {
                    ...userData,
                    phone: e.target.value,
                  },
                });
              }}
            />
          </div>
        ) : null}
        {userData.website.length > 0 ? (
          <div style={{ display: "flex" }}>
            <ContentEditable
              html={`Web: ${userData.website}`}
              disabled={false}
              onChange={(e) => {
                changeData({
                  field: "userData",
                  value: {
                    ...userData,
                    website: e.target.value,
                  },
                });
              }}
            />
          </div>
        ) : null}
        {userData.address.length > 0 ? (
          <div style={{ display: "flex" }}>
            <ContentEditable
              html={`Address: ${userData.address}`}
              disabled={false}
              onChange={(e) => {
                changeData({
                  field: "userData",
                  value: {
                    ...userData,
                    address: e.target.value,
                  },
                });
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
  // return (
  //   <div
  //     className={clsx(
  //       "col-span-2 grid justify-items-start gap-3 p-4",
  //       css(`a{ color: ${bgColor}!important }`),
  //       css(`--text-color: ${bgColor}!important`)
  //     )}
  //     style={{
  //       fontFamily: fontFamily,
  //     }}
  //   >
  //     <div className={clsx("flex flex-col gap-2.5")}>
  //       <div>
  //         <DataDisplay
  //           className={`text-[${headerSize}px]`}
  //           changeContent={(newContent: string) => {
  //             changeData({
  //               field: "userData",
  //               value: {
  //                 ...userData,
  //                 name: newContent,
  //               },
  //             });
  //           }}
  //         >
  //           {userData.name}
  //         </DataDisplay>

  //         <DataDisplay
  //           className={`text-[${headerSize}]`}
  //           changeContent={(newContent: string) => {
  //             changeData({
  //               field: "jobDescription",
  //               value: newContent,
  //             });
  //           }}
  //         >
  //           {jobDescription}
  //         </DataDisplay>
  //       </div>
  //       <DataDisplay
  //         icon={<Mail className={iconClass} color={bgColor} />}
  //         className="!gap-2 text-xs"
  //         link={`mailto:${userData.email}`}
  //         changeContent={(newContent: string) => {
  //           changeData({
  //             field: "userData",
  //             value: {
  //               ...userData,
  //               email: newContent,
  //             },
  //           });
  //         }}
  //       >
  //         {userData.email}
  //       </DataDisplay>

  //       <DataDisplay
  //         icon={<Phone className={iconClass} color={bgColor} />}
  //         className="!gap-2 text-xs"
  //         link={`tel:${userData.phone}`}
  //         changeContent={(newContent: string) => {
  //           changeData({
  //             field: "userData",
  //             value: {
  //               ...userData,
  //               phone: newContent,
  //             },
  //           });
  //         }}
  //       >
  //         {userData.phone}
  //       </DataDisplay>

  //       <DataDisplay
  //         icon={<Globe className="h-5 w-5" color={bgColor} />}
  //         link={userData.website}
  //         className="!gap-2 text-xs"
  //         changeContent={(newContent: string) => {
  //           changeData({
  //             field: "userData",
  //             value: {
  //               ...userData,
  //               website: newContent,
  //             },
  //           });
  //         }}
  //       >
  //         {userData.website}
  //       </DataDisplay>
  //       <DataDisplay
  //         icon={<MapPin className="h-5 w-5" color={bgColor} />}
  //         className="!gap-2 text-xs"
  //         changeContent={(newContent: string) => {
  //           changeData({
  //             field: "userData",
  //             value: {
  //               ...userData,
  //               address: newContent,
  //             },
  //           });
  //         }}
  //       >
  //         {userData.address}
  //       </DataDisplay>
  //       {/*
  //       {profiles.map(({ id, username, network, url }) => (
  //         <DataDisplay
  //           key={id}
  //           icon={getProfileIcon(network)}
  //           link={url && addHttp(url)}
  //           className="!gap-2 text-xs"
  //         >
  //           {username}
  //         </DataDisplay>
  //       ))} */}
  //     </div>
  //   </div>
  // );
};

export const MastheadMain: React.FC = () => {
  const useCoverLetterData = createCoverLetterData("1");
  const { text, changeData } = useCoverLetterData();

  const useSettings = createCoverLetterSettings("1");
  const { fontColor, fontFamily, fontSize } = useSettings();
  return (
    <>
      <div
        contentEditable
        suppressContentEditableWarning
        className="px-12 pt-14 font-normal"
        style={{
          fontFamily,
          fontSize: parseInt(fontSize),
          color: fontColor,
        }}
      >
        {convertTimestampToDate(Date.now())}
      </div>
      <ContentEditable
        className="px-12 pt-14 font-normal"
        style={{
          fontFamily,
          fontSize: parseInt(fontSize),
          color: fontColor,
        }}
        disabled={false}
        html={text}
        onChange={(e) => {
          changeData({
            field: "text",
            value: e.target.value,
          });
        }}
      />
    </>
  );
};
