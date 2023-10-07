import UserInfoForm from "./UserInfoForm";
import ImageWrapper from "@/components/ImageWrapper";
import { fetchUser } from "@/lib/actions/userInfo.actions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserInfo } from "./pageType";

const UserInfoPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const userInfoData: UserInfo = await fetchUser(user.id || "");

  const defaultValues = {
    displayName: userInfoData?.displayName || "",
    id: user.id || "",
    contactInfo: userInfoData?.contactInfo,
    locaiton: userInfoData?.location,
    links: userInfoData?.links,
  };

  return (
    <ImageWrapper imgSrc="userInfo">
      <div className="flex-1 flex flex-col items-center py-12 space-y-8 px-8">
        <UserInfoForm defaultValues={defaultValues}></UserInfoForm>
      </div>
    </ImageWrapper>
  );
};

export default UserInfoPage;

// display name
//contact info (email, phone)
//location
//links (linkedin, github, website)
