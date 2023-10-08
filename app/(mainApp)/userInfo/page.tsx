import UserInfoForm from "./UserInfoForm";
import ImageWrapper from "@/components/ImageWrapper";
import { fetchUser } from "@/lib/actions/userInfo.actions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserInfo } from "./pageType";
import TestComponent from "./TestComponent";

const UserInfoPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  console.log("PAGE RELOADING");

  if (!user.id) {
    return <div>Please login</div>;
  }

  const userInfoData: UserInfo = await fetchUser(user.id);

  const defaultValues: UserInfo = {
    displayName: userInfoData ? userInfoData?.displayName : "",
    contactInfo: userInfoData
      ? JSON.parse(JSON.stringify(userInfoData?.contactInfo))
      : [{ contact: "" }],
    location:
      userInfoData && userInfoData?.location ? userInfoData.location : "",
    links: userInfoData
      ? JSON.parse(JSON.stringify(userInfoData?.links))
      : [{ linkName: "", link: "" }],
    id: user.id || "",
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