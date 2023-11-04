//import { TestResumeHeader } from "@/components/ResumeComponents/ResumeForms/testHeaderSections";
import MainEditor from "../mainEditor";
import { fetchUser } from "@/lib/actions/user.actions";
import authOptions from "@/lib/authOptions";
import { Session, getServerSession } from "next-auth";

const BuildResume = async ({ params }: { params: { resumeId: string } }) => {
  const session: Session | null = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.email) {
    throw new Error("User not found");
  }

  const user = await fetchUser(session.user.email);

  if (!user.resumes.includes(params.resumeId)) {
    return (
      <main className="flex w-full h-full items-center justify-center">
        <h1 className="text-4xl ">
          This resume does not exist go back to dashboard
        </h1>
      </main>
    );
  }

  return (
    <>
      <MainEditor resumeId={params.resumeId} />
    </>
  );
};

export default BuildResume;
