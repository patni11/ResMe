import { deleteUser, fetchUser } from "@/lib/actions/user.actions";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Profile - ResMe",
  description: "Your Profile",
  verification: {
    google: "google-site-verification=G-501H6DW77H",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
  },
};

import { getUserSubscriptionPlan } from "@/lib/stripe";
import ProfilePageComponent from "./profilePageComponent";

const Profile = async () => {
  const user = await fetchUser();
  const subscriptionPlan = await getUserSubscriptionPlan();

  return (
    <ProfilePageComponent subscriptionPlan={subscriptionPlan} user={user} />
  );
};

export default Profile;
