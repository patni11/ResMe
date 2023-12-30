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
  const { fontFamily, fontSize, ascentColor, headerSize } = useSettings();

  const iconClass = `h-5 w-5 mr-1`;
  const textContainerStyle: React.CSSProperties = {
    display: "inline-block",
    alignItems: "center", // Corresponds to 'items-center'
    textAlign: "left", // Corresponds to 'text-left'
  };

  return (
    <div
      className="mb-4 flex justify-start flex-col space-y-2 border-b p-12 pb-8 text-left"
      style={{
        backgroundImage: `url(https://localhost:3000/coverLetter/PowerPink.jpeg)`, // Set the background image
        backgroundSize: "cover", // Cover the entire space of the element
        backgroundPosition: "center", // Center the image
        color: ascentColor,
        fontSize,
        fontFamily,
      }}
    >
      <div>
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

      <div className="flex flex-wrap justify-start gap-4">
        {/* <DataDisplay icon={<Cake />}>{formatDateString(birthdate, dateFormat)}</DataDisplay> */}
        {userData.email.length > 0 ? (
          <div style={textContainerStyle}>
            <Mail className={iconClass} color={ascentColor} />
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
            <Phone className={iconClass} color={ascentColor} />
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
            <Globe className={iconClass} color={ascentColor} />
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
            <MapPin className={iconClass} color={ascentColor} />
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
        className="px-12 py-8 font-normal"
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
