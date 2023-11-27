import { UserInfoFormOnboarding } from "../userInfo/UserInfoForm";
import UserInfoForm from "./UserInfoForm";
import {
  fetchResumeHeaderInfo,
  updateResumeHeaderInfo,
} from "@/lib/actions/resumeHeaderInfo.actions";
//import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserInfo } from "@/lib/types";
import { getServerSession } from "next-auth/next";
import authOptions, { Session } from "@/lib/authOptions";
import { Metadata } from "next";

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

export const UserInfoComponent = async () => {
  const session: Session | null = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error("User not found");
  }

  const userInfoData: UserInfo | null = await fetchResumeHeaderInfo(
    session.user.email
  );

  if (!userInfoData && session.user.email) {
    await updateResumeHeaderInfo({
      displayName: "",
      location: "",
      contactInfo: [{ contactName: "", contact: "" }],
      links: [{ linkName: "", link: "" }],
      email: session.user.email,
    });
  }

  const defaultValues: UserInfo = {
    displayName: userInfoData ? userInfoData?.displayName : "",
    contactInfo:
      userInfoData && userInfoData.contactInfo
        ? JSON.parse(JSON.stringify(userInfoData?.contactInfo))
        : [{ contactName: "", contact: "" }],
    location:
      userInfoData && userInfoData?.location ? userInfoData.location : "",
    links:
      userInfoData && userInfoData.links
        ? JSON.parse(JSON.stringify(userInfoData?.links))
        : [{ linkName: "", link: "" }],
    email:
      userInfoData && userInfoData?.email
        ? userInfoData.email
        : session.user.email || "",
  };

  // const contactInfo = JSON.parse(JSON.stringify(userInfoData?.contactInfo));
  // const contactInfo2 = [{ contact: "shubhpatni2002@gmail.com" }];
  // console.log(contactInfo, contactInfo2);

  return <UserInfoForm defaultValues={defaultValues}></UserInfoForm>;
};

export const UserInfoOnboard = async () => {
  const session: Session | null = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error("User not found");
  }

  const userInfoData: UserInfo | null = await fetchResumeHeaderInfo(
    session.user.email
  );

  if (!userInfoData && session.user.email) {
    await updateResumeHeaderInfo({
      displayName: "",
      location: "",
      contactInfo: [{ contactName: "", contact: "" }],
      links: [{ linkName: "", link: "" }],
      email: session.user.email,
    });
  }

  const defaultValues: UserInfo = {
    displayName: userInfoData ? userInfoData?.displayName : "",
    contactInfo:
      userInfoData && userInfoData.contactInfo
        ? JSON.parse(JSON.stringify(userInfoData?.contactInfo))
        : [{ contactName: "", contact: "" }],
    location:
      userInfoData && userInfoData?.location ? userInfoData.location : "",
    links:
      userInfoData && userInfoData.links
        ? JSON.parse(JSON.stringify(userInfoData?.links))
        : [{ linkName: "", link: "" }],
    email:
      userInfoData && userInfoData?.email
        ? userInfoData.email
        : session.user.email || "",
  };

  // const contactInfo = JSON.parse(JSON.stringify(userInfoData?.contactInfo));
  // const contactInfo2 = [{ contact: "shubhpatni2002@gmail.com" }];
  // console.log(contactInfo, contactInfo2);
  return <UserInfoFormOnboarding defaultValues={defaultValues} />;
};

// display name
//contact info (email, phone)
//location
//links (linkedin, github, website)
