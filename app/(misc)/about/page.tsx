import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <>
      <section className="h-screen w-[80%] lg:w-[40%] my-24 mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>
              <h1 className="text-2xl font-bold">About</h1>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            Still Working on the page
          </CardContent>
        </Card>
      </section>
    </>
  );
}
