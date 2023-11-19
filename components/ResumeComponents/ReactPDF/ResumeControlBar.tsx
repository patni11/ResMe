"use client";
import { useCallback, useEffect, useState } from "react";
import { usePDF } from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Download } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { sendPDFDownloadEmail } from "@/lib/actions/sendEmail.action";
import { useSession } from "next-auth/react";
import { ComingSoon } from "@/components/Cards/ComingSoon";
import { ArrowUpRightSquare } from "lucide-react";
import * as gtag from "@/lib/gtag";
import { useToast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
const ResumeControlBar = ({
  document,
  fileName,
}: {
  document: JSX.Element;
  fileName: string;
}) => {
  const [instance, update] = usePDF({ document });
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const email = session?.user?.email || "";
  const name = session?.user?.name || "";
  const { toast } = useToast();

  //Hook to update pdf when document changes
  useEffect(() => {
    update(document);
  }, [document]);

  if (instance.error) return <div>Download Error</div>;

  // const getShareUrl = useCallback(async () => {
  //   const res = await startUpload([new File([instance.blob!], "pdf")]);
  //   //startUpload([new File([instance.blob], { type: "application/pdf" })

  //   if (!res) {
  //     //show error
  //     toast({
  //       title: "Couldn't copy the file link",
  //       variant: "destructive",
  //     });
  //     return "";
  //   }
  //   // get the link of the url from upload thing
  //   console.log("Res", res);
  //   const [fileResponse] = res;
  //   const key = fileResponse?.key;
  //   console.log("File resp", fileResponse);

  //   if (!key) {
  //     //show error
  //     toast({
  //       title: "Couldn't copy the file link",
  //       variant: "destructive",
  //     });
  //     return "";
  //   }

  //   return fileResponse.url;
  // }, [document]);

  // const handleCopyToClipboard = async (url: string) => {
  //   await navigator.clipboard.writeText(url);

  //   toast({
  //     title: "URL Link Copied",
  //   });
  // };

  //  const { startUpload } = useUploadThing("pdfUploader");

  return (
    <div className="flex space-x-2">
      <ComingSoon>
        <Button
          disabled={instance.loading || isLoading}
          variant="outlineHover"
          size="xs"
          className="flex space-x-2"
          onClick={async () => {
            //setIsLoading(true);
            gtag.event({
              clientWindow: window,
              action: "Share Link",
              category: "Download",
              label: "Share Link",
            });
            // call upload thing to save the link as pdf
            //const url = await getShareUrl();
            //console.log("URL", url);
            // put it in the person's clipboard
            //handleCopyToClipboard(url);
            //setIsLoading(false);
          }}
        >
          <ArrowUpRightSquare className="w-4 h-4" />

          <span>Copy</span>
        </Button>
      </ComingSoon>

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
        <a
          href={instance.url!}
          download={fileName}
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
