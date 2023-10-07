import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <section className="w-[80%] items-center py-12 mx-auto">
      <Card className="w-full border-none">
        <CardHeader>
          <CardTitle>
            <Skeleton className="w-[40%] h-8"></Skeleton>
          </CardTitle>
          <CardDescription>
            <Skeleton className="w-[75%] h-4"></Skeleton>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-[75%] h-12"></Skeleton>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Skeleton className="w-16 h-8"></Skeleton>
        </CardFooter>
      </Card>
    </section>
  );
}

{
  /* <Skeleton className="h-4 w-56" /> */
}
