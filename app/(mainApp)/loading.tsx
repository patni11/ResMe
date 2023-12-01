import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <section className="w-[80%] items-center py-12 mx-auto">
      <Card className="w-full border-none">
        <CardHeader className="flex flex-col space-y-4">
          <Skeleton className="w-[40%] h-8"></Skeleton>

          <Skeleton className="w-[75%] h-4"></Skeleton>
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
