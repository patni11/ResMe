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
    <Card className="w-[350px] p-2 lg:w-[750px] lg:p-12 lg:space-y-8 flex flex-col border-none">
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
      <CardFooter className="flex justify-between">
        <Skeleton className="w-16 h-8"></Skeleton>
        <Skeleton className="w-16 h-8"></Skeleton>
      </CardFooter>
    </Card>
  );
}
