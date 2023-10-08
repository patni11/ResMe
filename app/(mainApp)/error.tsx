"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="relative w-full h-full flex justify-center items-center">
      {/* Background Image */}
      <div className="relative w-[50%] h-[50%] z-0">
        <Image
          src="/pageStyles/errorPage/pixelArt1.png"
          alt="Background Image"
          layout="fill"
          sizes="50vw"
          objectFit="cover"
          quality={50}
        />
      </div>

      {/* Card on top of Image */}
      <div className="absolute z-2 shadow-xl">
        <Card>
          <CardHeader>
            <CardTitle>Something went wrong!</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button
              onClick={() => {
                reset;
              }}
            >
              Try again
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
