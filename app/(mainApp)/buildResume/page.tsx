import MainEditor from "./mainEditor";
import { fetchUser } from "@/lib/actions/user.actions";
import authOptions from "@/lib/authOptions";
import { Session, getServerSession } from "next-auth";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Build Resume - ResMe",
  description: "Create Professional Resume",
  verification: {
    google: "google-site-verification=G-501H6DW77H",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
  },
};

const BuildResume = async () => {
  const session: Session | null = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.email) {
    throw new Error("User not found");
  }

  const user = await fetchUser(session.user.email);

  if (user.resumeCount >= 3) {
    return (
      <main className="flex w-full h-full items-center justify-center">
        <h1 className="text-4xl ">Upgrade to premium to create more resumes</h1>
      </main>
    );
  }

  return (
    <main className="flex justify-between w-full h-full">
      <MainEditor></MainEditor>
    </main>
  );
};

export default BuildResume;
