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
      className=" mb-4 justify-between flex p-12 pb-8 text-left items-center"
      style={{
        color: bgColor,
        fontSize,
        fontFamily,
      }}
    >
      <div
        style={{
          backgroundColor: ascentColor,
        }}
        className="flex rounded-md px-8 py-4 justify-center items-center"
      >
        <div
          className="flex flex-col"
          style={{ fontSize: parseInt(headerSize) }}
        >
          <h2>Michael Scott</h2>
          <h2>Michael Scott</h2>
        </div>
        {/* <div className="flex flex-col mr-24">
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
        </div> */}
        {/* absolute z-2 -right-4 top-[42%]  */}
        {/* <div
          className="p-3 rounded-md transform rotate-45 flex items-center justify-center border-4 h-5 w-5"
          style={{
            backgroundColor: ascentColor,
            borderColor: bgColor,
          }}
        ></div> */}
      </div>

      <div
        className="flex flex-col flex-wrap items-end space-y-2 text-end"
        style={{
          color: ascentColor,
        }}
      >
        {/* <DataDisplay icon={<Cake />}>{formatDateString(birthdate, dateFormat)}</DataDisplay> */}

        {userData.email.length > 0 ? (
          <div style={textContainerStyle}>
            <Mail className={iconClass} color={bgColor} />
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
          <div style={textContainerStyle}>
            <Phone className={iconClass} color={bgColor} />
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

        {userData.website.length > 0 ? (
          <div style={textContainerStyle}>
            <Globe className={iconClass} color={bgColor} />
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
          <div style={textContainerStyle}>
            <MapPin className={iconClass} color={bgColor} />
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
  );
};

export const MastheadMain: React.FC = () => {
  const useCoverLetterData = createCoverLetterData("1");
  const { text, changeData } = useCoverLetterData();

  const useSettings = createCoverLetterSettings("1");
  const { fontColor, fontFamily, fontSize } = useSettings();
  console.log("Data", text);
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
