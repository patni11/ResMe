import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

export default function Loading() {
  return (
    <main className="flex w-full h-full items-center justify-center px-8">
      <Card className="w-[100%] mt-24 md:w-[50%] max-w-[450px] my-auto">
        <CardHeader>
          <Skeleton className="w-[40%] h-8"></Skeleton>
          <Skeleton className="w-[70%] h-8"></Skeleton>
        </CardHeader>

        <Separator className="mb-6" />

        <CardContent className="flex flex-col space-y-4 justify-center">
          <Skeleton className="w-full h-8"></Skeleton>
          <Skeleton className="w-full h-8"></Skeleton>
          <Skeleton className="w-full h-8"></Skeleton>
          <Skeleton className="w-full h-8"></Skeleton>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Skeleton className="w-[50%] h-8"></Skeleton>
          <Skeleton className="w-[50%] h-8"></Skeleton>
        </CardFooter>
      </Card>
    </main>
  );
}
