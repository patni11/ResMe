import React from "react";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import DataDisplay from "../../shared/DataDisplay";
import { createCoverLetterData } from "@/store/coverLetter/data";
import { createCoverLetterSettings } from "@/store/coverLetter/settings";

const Masthead = () => {
  const useCoverLetterData = createCoverLetterData("1");
  const { userData, jobDescription, changeData } = useCoverLetterData();
  const useSettings = createCoverLetterSettings("1");
  const { bgColor, fontFamily, fontSize, headerSize } = useSettings();

  return (
    <div className="mb-4 grid justify-center gap-3 border-b pb-4 text-center">
      <div>
        <h1 className="mb-1">{userData.name}</h1>
        <p className="opacity-75">{jobDescription}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {/* <DataDisplay icon={<Cake />}>{formatDateString(birthdate, dateFormat)}</DataDisplay> */}
        <DataDisplay
          icon={<Mail className="h-5 w-5" color={bgColor} />}
          link={`mailto:${userData.email}`}
          changeContent={(newContent: string) => {
            changeData({
              field: "userData",
              value: {
                ...userData,
                email: newContent,
              },
            });
          }}
        >
          {userData.email}
        </DataDisplay>

        <DataDisplay
          icon={<Phone className="h-5 w-5" color={bgColor} />}
          link={`tel:${userData.phone}`}
          changeContent={(newContent: string) => {
            changeData({
              field: "userData",
              value: {
                ...userData,
                phone: newContent,
              },
            });
          }}
        >
          {userData.phone}
        </DataDisplay>

        <DataDisplay
          icon={<Globe className="h-5 w-5" color={bgColor} />}
          link={userData.website}
          changeContent={(newContent: string) => {
            changeData({
              field: "userData",
              value: {
                ...userData,
                website: newContent,
              },
            });
          }}
        >
          {userData.website}
        </DataDisplay>

        <DataDisplay
          icon={<MapPin className="h-5 w-5" color={bgColor} />}
          changeContent={(newContent: string) => {
            changeData({
              field: "userData",
              value: {
                ...userData,
                address: newContent,
              },
            });
          }}
        >
          {userData.address}
        </DataDisplay>
      </div>
    </div>
  );
};

export default Masthead;
