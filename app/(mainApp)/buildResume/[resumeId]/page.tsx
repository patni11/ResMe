//import { TestResumeHeader } from "@/components/ResumeComponents/ResumeForms/testHeaderSections";
import MainEditor from "../mainEditor";
import { fetchUser } from "@/lib/actions/user.actions";

const BuildResume = async ({ params }: { params: { resumeId: string } }) => {
  const user = await fetchUser();

  if (!user.resumes.includes(params.resumeId)) {
    return (
      <main className="flex w-full h-full items-center justify-center">
        <h3 className="text-4xl ">
          This resume does not exist go back to dashboard
        </h3>
      </main>
    );
  }

  return (
    <>
      <MainEditor email={user.email} resumeId={params.resumeId} />
    </>
  );
};

export default BuildResume;
