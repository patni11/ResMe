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
      <Navbar></Navbar>
      <main className="flex flex-col justify-center items-center h-screen w-screen space-y-12">
        <Card className="w-[350px] p-2 lg:w-[750px] lg:p-12 lg:space-y-8 flex flex-col">
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
            <CardDescription className="text-md">
              Reach out to us with any product feedback, questions, bugs, help,
              we even provide <strong>FREE</strong> Resume Review
            </CardDescription>
          </CardHeader>

          <CardContent className="flex justify-between">
            <a href="https://discord.gg/xn8xYGKqhF" className="underline">
              Discord{" "}
              <span className="text-xs text-secondary-foreground">
                (Recommended)
              </span>
            </a>

            <a href="mailto:founder@resme.xyz" className="underline">
              Send email
            </a>
          </CardContent>
        </Card>
      </main>
    </>
  );
};

export default Support;
