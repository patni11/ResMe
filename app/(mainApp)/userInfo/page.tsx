"use client";
import { FC } from "react";
import UserInfoForm from "./UserInfoForm";
import Image from "next/image";
interface UserInfoPageProps {}

const UserInfoPage: FC<UserInfoPageProps> = () => {
  const addData = () => {};

  return (
    <main className="flex justify-center w-full h-full">
      <div className="flex-1 flex flex-col items-center py-12 space-y-8 px-8">
        <UserInfoForm addData={addData}></UserInfoForm>
      </div>
      <div className="flex-shrink-0 w-1/3 max-w-[30%] h-full relative">
        {/* Aspect ratio container */}
        <div className="relative h-full" style={{ paddingTop: "42.86%" }}>
          <Image
            src="/pageStyles/userInfo/pixelArt1.png"
            alt="graphic"
            layout="fill" // This makes the image take up the full width and height of its container
            objectFit="cover" // This ensures the image maintains its aspect ratio while filling its container
          />
        </div>
      </div>
    </main>
  );
};

export default UserInfoPage;

// display name
//contact info (email, phone)
//location
//links (linkedin, github, website)
