import React from "react";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import { createCoverLetterData } from "@/store/coverLetter/data";
import { createCoverLetterSettings } from "@/store/coverLetter/settings";
import ContentEditable from "react-contenteditable";
import { convertTimestampToDate } from "@/lib/utils";

const Masthead = () => {
  const useCoverLetterData = createCoverLetterData("1");
  const { userData, jobDescription, changeData } = useCoverLetterData();
  const useSettings = createCoverLetterSettings("1");
  const { bgColor, fontFamily, fontSize, ascentColor, headerSize } =
    useSettings();

  const iconClass = `h-5 w-5 mr-2`;
  const textContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    flexFlow: "nowrap",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div
      className="mb-4 flex justify-start flex-col space-y-2 p-12 pb-8 text-left"
      style={{
        backgroundColor: bgColor,
        color: bgColor,
        fontSize,
        fontFamily,
      }}
    >
      <div
        style={{
          color: ascentColor,
        }}
        className="flex w-full flex-col items-center mb-2 -space-y-2"
      >
        <ContentEditable
          html={userData.name}
          disabled={false}
          style={{ fontSize: parseInt(headerSize) }}
          className="font-bold"
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
          className="opacity-80 font-bold"
          onChange={(e) => {
            changeData({
              field: "jobDescription",
              value: e.target.value,
            });
          }}
        />
      </div>

      <div
        className="flex flex-wrap justify-start gap-4"
        style={{
          backgroundColor: ascentColor,
          display: "flex",
          flexDirection: "column",
          width: "full",
          justifyItems: "center",
          padding: "24px",
          borderRadius: "1em",
        }}
      >
        {/* <DataDisplay icon={<Cake />}>{formatDateString(birthdate, dateFormat)}</DataDisplay> */}
        <div className="flex w-full justify-between">
          {userData.email.length > 0 ? (
            <div style={{ display: "flex" }}>
              {/* <Mail className={iconClass} color={bgColor} /> */}
              <ContentEditable
                html={userData.email}
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
              {/* <Phone className={iconClass} color={bgColor} /> */}
              <ContentEditable
                html={userData.phone}
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
        </div>

        <div className="flex w-full justify-between">
          {userData.website.length > 0 ? (
            <div style={{ display: "flex" }}>
              {/* <Globe className={iconClass} color={bgColor} /> */}
              <ContentEditable
                html={userData.website}
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
              {/* <MapPin className={iconClass} color={bgColor} /> */}
              <ContentEditable
                html={userData.address}
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
    </div>
  );
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
        className="px-12 pt-8 font-normal"
        style={{
          fontFamily,
          fontSize: parseInt(fontSize),
          color: fontColor,
        }}
      >
        {convertTimestampToDate(Date.now())}
      </div>

      <ContentEditable
        className="px-12 pt-6 font-normal"
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

export default Masthead;
