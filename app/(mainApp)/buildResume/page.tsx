import MainEditor from "./mainEditor";
import { fetchUser } from "@/lib/actions/user.actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Build Resume - ResMe",
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
  const user = await fetchUser();

  if (user.resumeCount >= 3) {
    return (
      <main className="flex w-full h-full items-center justify-center">
        <h1 className="text-4xl ">
          Upgrade to premium to create more resumes or delete old resumes
        </h1>
      </main>
    );
  }
  const email = user.email;

  return (
    <main className="flex justify-between w-full h-full">
      {/* <MainEditor email={email} /> */}
    </main>
  );
};

export default BuildResume;
