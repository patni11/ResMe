"use client";
import { SectionWrapper } from "./SectionWrapper";
import { createCoverLetterData } from "@/store/coverLetter/data";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const YourInfo = () => {
  const useCoverLetterData = createCoverLetterData("1");
  const { userData, jobDescription, changeData } = useCoverLetterData();

  return (
    <>
      <SectionWrapper
        title="Your Info"
        description="Edit your name, email, phone, address etc"
      >
        <div className="flex flex-col space-y-2 w-full">
          <Label> Name </Label>
          <Input
            value={userData.name}
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

          <Label> Email </Label>
          <Input
            value={userData.email}
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

          <div className="flex space-x-2">
            <div className="flex flex-col space-y-1">
              <Label> Phone </Label>
              <Input
                value={userData.phone}
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
            <div className="flex flex-col space-y-1">
              <Label> Website </Label>
              <Input
                value={userData.website}
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
          </div>
          <Label> Address </Label>
          <Input
            value={userData.address}
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

          <Label> Job Description </Label>
          <Input
            value={jobDescription}
            onChange={(e) => {
              changeData({ field: "jobDescription", value: e.target.value });
            }}
          />
        </div>
      </SectionWrapper>
    </>
  );
};

export default YourInfo;
