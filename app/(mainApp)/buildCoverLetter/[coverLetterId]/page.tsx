//import { TestResumeHeader } from "@/components/ResumeComponents/ResumeForms/testHeaderSections";

const BuildCoverLetter = async ({
  params,
}: {
  params: { resumeId: string };
}) => {
  //const user = await fetchUserCoverLetters();

  //   if (!user || !user.coverLetters) {
  //     throw alert("Could not find resume");
  //   }

  // const isSubscribed = Boolean(
  //   user.stripePriceId &&
  //     user.stripeCurrentPeriodEnd && // 86400000 = 1 day
  //     user.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now()
  // );  TODO:Uncomment
  const isSubscribed = true;

  //   if (!user.resumes.includes(params.resumeId)) {
  //     return (
  //       <main
  //         className="w-full h-full top-[50%]"
  //         style={{ position: "absolute" }}
  //       >
  //         <h3 className="text-4xl text-center">
  //           This resume does not exist go back to dashboard
  //         </h3>
  //       </main>
  //     );
  //   }

  return (
    <>
      <MainEditor
        email={user.email}
        resumeId={params.resumeId}
        isSubscribed={isSubscribed}
        name={user.name || ""}
      />
    </>
  );
};

export default BuildResume;
