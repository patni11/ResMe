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
  const subscriptionPlan = await getUserSubscriptionPlan();
  return <ProfilePageComponent subscriptionPlan={subscriptionPlan} />;
};

export default Profile;
