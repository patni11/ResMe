"use client";
import { ReactElement, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { onboardUser } from "@/lib/actions/user.actions";
const OnboardingCard = ({
  reactElements,
}: {
  reactElements: ReactElement[];
}) => {
  const [index, setIndex] = useState(0);
  const [elements, setElements] = useState<ReactElement[]>(reactElements);
  const router = useRouter();

  return (
    <Card className="w-[350px] p-2 lg:w-[750px] lg:p-12 lg:space-y-8 flex flex-col">
      <div className="overflow-y-auto max-h-[550px]">{elements[index]}</div>
      {index !== 6 ? (
        <div className="flex w-full justify-between items-center">
          <Button
            variant="link"
            onClick={async () => {
              await onboardUser("/dashboard");
              router.push("/dashboard");
            }}
          >
            Set up Later
          </Button>
          <div className="flex space-x-2 lg:space-x-8">
            {index !== 0 && (
              <Button
                size="icon"
                className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
                onClick={() => {
                  setIndex(index - 1);
                }}
              >
                <ChevronLeft className="h-5 w-5" />{" "}
              </Button>
            )}

            <Button
              size="icon"
              className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
              onClick={async () => {
                if (index + 1 == 6) {
                  await onboardUser("/dashboard");
                }
                setIndex(index + 1);
              }}
            >
              <ChevronRight className="h-5 w-5" />{" "}
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <Link
            href="/buildResume"
            className={`${buttonVariants({
              variant: "ghost",
            })} border border-blue-600 hover:bg-blue-600 w-[60%] mb-8 lg:m-0 lg:w-[40%]`}
          >
            <span className="text-md text-blue-600 hover:text-primary-foreground font-semibold lg:text-lg">
              Create Resume
            </span>
          </Link>
        </div>
      )}
    </Card>
  );
};

export default OnboardingCard;
