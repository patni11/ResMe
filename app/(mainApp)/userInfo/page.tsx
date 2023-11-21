import ImageWrapper from "@/components/ImageWrapper";
import { Metadata } from "next";
import { UserInfoComponent } from "./userInfoComponent";

export const metadata: Metadata = {
  title: "User Info - ResMe",
  description: "Your Info",
  verification: {
    google: "google-site-verification=G-501H6DW77H",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
  },
};

const UserInfoPage = async () => {
  return (
    <ImageWrapper imgSrc="userInfo">
      <div className="flex-1 flex flex-col items-center py-12 space-y-8 px-8">
        <UserInfoComponent />
        {/* <TestComponent defaultValues={defaultValues}></TestComponent> */}
      </div>
    </ImageWrapper>
  );
};

export default UserInfoPage;

// display name
//contact info (email, phone)
//location
//links (linkedin, github, website)
