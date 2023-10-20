import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { useRouter, useSearchParams } from "next/navigation";
import {
  updateResumeHeaderInfo,
  updateResumeHeaderInfo,
} from "@/lib/actions/resumeHeaderInfo.actions";
import { UserInfo } from "../(mainApp)/userInfo/pageType";

export default async function Page() {
  const { getUser } = getKindeServerSession();
  const user = getUser();
  const router = useRouter();

  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  if (!user || !user.id) {
    router.push(`/sign-in`);
    return;
  }

  //check if user in DB
  const dbUser: any = await updateResumeHeaderInfo(user.id);

  if (dbUser.error) {
    const userInfo: UserInfo = {
      id: user.id,
      displayName: user.given_name || "",
    };
    await updateResumeHeaderInfo(userInfo);
  } else {
    router.push(origin ? `/${origin}` : "/dashboard");
  }
}
