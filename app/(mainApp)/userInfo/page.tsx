import UserInfoForm from "./UserInfoForm";
import ImageWrapper from "@/components/ImageWrapper";
import {
  fetchResumeHeaderInfo,
  updateResumeHeaderInfo,
} from "@/lib/actions/resumeHeaderInfo.actions";
//import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserInfo } from "./pageType";
import { getServerSession } from "next-auth/next";
import authOptions, { Session } from "@/lib/authOptions";

const UserInfoPage = async () => {
  const session: Session | null = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error("User not found");
  }

  const userInfoData: UserInfo = await fetchResumeHeaderInfo(
    session.user.email
  );

  if (!userInfoData) {
    throw new Error("User not in DB");
  }

  console.log(userInfoData);

  const defaultValues: UserInfo = {
    displayName: userInfoData ? userInfoData?.displayName : "",
    contactInfo:
      userInfoData && userInfoData.contactInfo
        ? JSON.parse(JSON.stringify(userInfoData?.contactInfo))
        : [{ contact: "" }],
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

  return (
    <ImageWrapper imgSrc="userInfo">
      <div className="flex-1 flex flex-col items-center py-12 space-y-8 px-8">
        <UserInfoForm defaultValues={defaultValues}></UserInfoForm>
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
