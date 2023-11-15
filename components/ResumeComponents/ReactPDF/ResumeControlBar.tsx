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
      <Button disabled={instance.loading}>
        <LoadingSpinner />
      </Button>
    );
  }

  if (instance.error) return <div>Download Error</div>;

  return (
    <a
      href={instance.url!}
      download={fileName}
      className={buttonVariants({
        variant: "default",
        className: "flex space-x-2",
      })}
    >
      <Download className="w-4 h-4" />
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
