import { UserInfoOnboard } from "@/app/(mainApp)/userInfo/userInfoComponent";
import { Card } from "@/components/ui/card";
import { GoForward, SetUpLater } from "@/components/Navigation/OnboardButtons";
const HeaderOnboard = () => {
  return (
    <Card className="w-[350px] p-2 lg:w-[750px] lg:p-12 lg:space-y-8 flex flex-col">
      <div className="overflow-y-auto max-h-[550px]">
        <UserInfoOnboard key="UserInfoFormOnboarding" />
      </div>
      <div className="flex w-full justify-between items-center">
        <SetUpLater />
        <GoForward page="/onboarding/education" />
      </div>
    </Card>
  );
};
export default HeaderOnboard;
