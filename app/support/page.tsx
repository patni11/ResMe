import InfoHeader from "@/components/Navigation/InfoHeader";
import Navbar from "@/components/Navigation/Navbar";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
const Support = () => {
  return (
    <>
      <InfoHeader />
      <Navbar></Navbar>
      <main className="flex flex-col justify-center items-center h-screen w-screen space-y-12">
        <Card className="w-[350px] lg:w-[750px] lg:p-12 lg:space-y-8 flex flex-col">
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
            <CardDescription className="text-md">
              Reach out to us with any product feedback, questions, bugs, help,
              we even provide <strong>FREE</strong> Resume Review
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col space-y-4">
            <a href="https://discord.gg/jNp89cbpSa" className="underline">
              Discord (Free resume review, community and job listings)
            </a>
            <a href="https://resme.canny.io/bug-report" className="underline">
              Report Bugs
            </a>
            <a href="mailto:founder@resme.xyz" className="underline">
              Send email (for collabs, promotions, anything)
            </a>
          </CardContent>
        </Card>
      </main>
    </>
  );
};

export default Support;
