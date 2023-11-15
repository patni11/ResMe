"use client";
import { useEffect } from "react";
import { usePDF } from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Download } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
const ResumeControlBar = ({
  document,
  fileName,
}: {
  document: JSX.Element;
  fileName: string;
}) => {
  const [instance, update] = usePDF({ document });

  //Hook to update pdf when document changes
  useEffect(() => {
    update(document);
  }, [document]);

  if (instance.loading) {
    return (
      <button disabled={instance.loading}>
        <LoadingSpinner />
      </button>
    );
  }

  if (instance.error) return <div>Download Error</div>;

  return (
    <a
      className="flex text-sm pl-2 font-semibold cursor-pointer w-full hover:bg-secondary"
      href={instance.url!}
      download={fileName}
    >
      <span>PDF</span>
    </a>
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
