//@ts-nocheck
"use client";
import { useEffect, useState, useRef } from "react";
import { usePDF } from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Download, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { sendPDFDownloadEmail } from "@/lib/actions/sendEmail.action";
import { useResumeDataContext } from "@/app/(mainApp)/buildResume/ResumeDataContext";
//import { ComingSoon } from "@/components/Cards/ComingSoon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowUpRightSquare } from "lucide-react";
import * as gtag from "@/lib/gtag";
import { useToast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
//import { getPDFLink, updatePDFLink } from "@/lib/actions/resumes.action";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ResumeControlBar = ({ document }: { document: JSX.Element }) => {
  const [instance, update] = usePDF({ document });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [url, setURL] = useState("");
  const [popup, setPopup] = useState(false);
  const { email, name, isSubscribed, resumeId } = useResumeDataContext();
  const inputRef = useRef<HTMLInputElement>(null);

  //Hook to update pdf when document changes
  useEffect(() => {
    update(document);
  }, [document]);

  //const { startUpload } = useUploadThing("pdfUploader");

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: (res) => {
      if (!res) {
        toast({
          title: "There was some error, try again",
          variant: "destructive",
        });
      }

      const url = res[0].url;

      toast({
        title: res[0].serverData.message,
      });

      setURL(url);
      setIsLoading(false);
      setPopup(true);
      return;
    },
    onUploadError: (e) => {
      console.log("On upload thing error: ", e);
      toast({
        title: `There was some error, try again. Error:${e}`,
        variant: "destructive",
      });
      setIsLoading(false);
    },
  });

  if (instance.error) return <div>Download Error</div>;

  // const getShareUrl = async () => {
  //   const res = await startUpload([new File([instance.blob!], "pdf")], {
  //     resumeId: resumeId,
  //   });

  //   if (!res) {
  //     //show error
  //     toast({
  //       title: "Couldn't copy the file link",
  //       variant: "destructive",
  //     });
  //     return "";
  //   }
  //   // get the link of the url from upload thing
  //   const [fileResponse] = res;
  //   const key = fileResponse?.key;

  //   if (!key) {
  //     //show error
  //     toast({
  //       title: "Couldn't copy the file link",
  //       variant: "destructive",
  //     });
  //     return "";
  //   }

  //   const pollInterval = 500; // 5 seconds
  //   const checkKeyInDB = async () => {
  //     const savedKey = await getPDFLink(resumeId);
  //     if (key == savedKey) {
  //       clearInterval(polling);
  //       return `https://utfs.io/f/${key}`;
  //     } else {
  //       await updatePDFLink(resumeId, key);
  //     }
  //   };
  //   const polling = setInterval(checkKeyInDB, pollInterval);
  //   return `https://utfs.io/f/${key}`;
  // };

  // const handleCopyToClipboard = async (url: string) => {
  //   await navigator.clipboard.writeText(url);

  //   toast({
  //     title: "URL Link Copied",
  //   });
  // };

  const handleButtonClick = async () => {
    setIsLoading(true);
    gtag.event({
      clientWindow: window,
      action: "Share Link",
      category: "Download",
      label: "Share Link",
    });
    // call upload thing to save the link as pdf
    // const url = await getShareUrl();

    // put it in the person's clipboard
    // handleCopyToClipboard(url);
    // setURL(url);
    // setIsLoading(false);
    // setPopup(true);
    startUpload([new File([instance.blob!], "pdf")], {
      resumeId: resumeId,
    });
  };

  const copyToClipboard = () => {
    if (inputRef.current) {
      navigator.clipboard
        .writeText(inputRef.current.value)
        .then(() => {
          // Handle successful copying here, e.g., show a message
          toast({
            title: "URL Copied!",
          });
        })
        .catch((err) => {
          // Handle errors here
          toast({
            title: "Error copying url, try to copy by manually selecting it",
            variant: "destructive",
          });
        });
    }
  };

  return (
    <div className="flex space-x-2">
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger className="cursor-default ml-1.5">
            <Button
              disabled={instance.loading || isLoading}
              variant="outlineHover"
              size="xs"
              className="flex space-x-2"
              onClick={(e) => {
                e.preventDefault();
                if (isSubscribed) {
                  handleButtonClick();
                } else {
                  toast({
                    title: "Please upgrade to use this feature",
                  });
                }
              }}
            >
              <ArrowUpRightSquare className="w-4 h-4" />

              <span>Copy</span>
            </Button>

            {/* <ComingSoon>
              <div
                className={buttonVariants({
                  variant: "outlineHover",
                  size: "xs",
                  className: "flex space-x-2",
                })}
              >
                Copy
              </div>
            </ComingSoon> */}
          </TooltipTrigger>
          <TooltipContent className="p-2 text-xs font-normal">
            Share Link to PDF
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {popup ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="flex flex-col space-y-4 bg-white rounded-lg p-4 w-[80%] md:w-[30%]">
            <div className="flex w-full justify-between items-center">
              <Label htmlFor="url" className="text-md">
                Share Link
              </Label>
              <button
                className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                onClick={() => {
                  setPopup(false);
                }}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </button>
            </div>

            <Input
              value={url}
              readOnly
              className="w-full"
              id="url"
              ref={inputRef}
              onClick={copyToClipboard}
            />
          </div>
        </div>
      ) : null}

      {instance.loading || isLoading ? (
        <Button
          disabled={instance.loading}
          variant="outlineHover"
          size="xs"
          className="flex space-x-2"
        >
          <LoadingSpinner />
        </Button>
      ) : (
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger className="cursor-default ml-1.5">
              <a
                href={instance.url!}
                download={`${name}_resume`}
                className={buttonVariants({
                  variant: "outlineHover",
                  size: "xs",
                  className: "flex space-x-2",
                })}
                onClick={() => {
                  setIsLoading(true);
                  gtag.event({
                    clientWindow: window,
                    action: "Download PDF",
                    category: "Download",
                    label: "Download PDF",
                  });
                  toast({
                    title: "PDF Downloaded Successfully 🥳",
                  });
                  sendPDFDownloadEmail({ name: name, email: email });
                  setIsLoading(false);
                }}
              >
                <Download className="w-4 h-4" />
                <span>PDF</span>
              </a>
            </TooltipTrigger>
            <TooltipContent className="p-2 text-xs font-normal">
              Download PDF file
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

{
  /* <button>
          <PDFDownloadLink document={document} fileName="somename.pdf">
            {({ blob, url, loading, error }) => {
              console.log("URL", url, loading);
              return loading ? (
                <Button disabled={loading}>
                  <LoadingSpinner />
                </Button>
              ) : (
                <Button className="flex space-x-2">
                  <Download className="w-4 h-4" /> <span>PDF</span>
                </Button>
              );
            }}
          </PDFDownloadLink>
        </button> */
}

/**
 * Load ResumeControlBar client side since it uses usePDF, which is a web specific API
 */
export const ResumeControlBarCSR = dynamic(
  () => Promise.resolve(ResumeControlBar),
  {
    ssr: false,
  }
);
