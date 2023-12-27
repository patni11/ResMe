"use client";

import { CoverLetterIFrameCSR } from "@/components/CoverLetter/CoverLetterIFrame";
import { CoverLetterPDF } from "@/components/CoverLetter/CoverLetterPDF";
import {
  useRegisterReactPDFFont,
  useRegisterReactPDFHyphenationCallback,
} from "@/components/fonts/hooks";
import {
  DEFAULT_FONT_FAMILY,
  LETTER_WIDTH_PX,
  A4_WIDTH_PX,
} from "@/components/PDFComponents/common/constants";
import { createCoverLetterSettings } from "@/store/coverLetter/settings";
import { useMemo, useState } from "react";

export default function CoverLetterPreview({
  CoverLetterID = "1",
}: {
  CoverLetterID?: string;
}) {
  const [pdfPreview, setPDFPreview] = useState(false);
  useRegisterReactPDFFont();
  useRegisterReactPDFHyphenationCallback(DEFAULT_FONT_FAMILY);

  const useSettings = createCoverLetterSettings(CoverLetterID);
  const { bgColor, fontColor, fontFamily, fontSize, headerSize, documentType } =
    useSettings();

  const document = useMemo(() => {
    return (
      <CoverLetterPDF
        CoverLetterID={CoverLetterID}
        settings={{
          bgColor,
          fontColor,
          fontFamily,
          fontSize,
          headerSize,
          documentType,
        }}
      />
    );
  }, [CoverLetterID]);

  const width = documentType === "A4" ? A4_WIDTH_PX : LETTER_WIDTH_PX;

  return (
    <main className="sticky top-0 w-full h-full flex flex-col bg-gray-200 px-4">
      <div
        style={{
          position: "relative",
        }}
        className="h-full w-full"
      >
        <CoverLetterIFrameCSR
          documentSize={documentType}
          scale={0.8}
          enablePDFViewer={pdfPreview}
        >
          {document}
        </CoverLetterIFrameCSR>
        {!pdfPreview ? (
          <div
            style={{
              width: `${width * 0.8}px`,
              height: "2rem",
              backgroundColor: "white",

              bottom: 0,
              left: 0,
              zIndex: 3, // Higher z-index to overlay over the Frame
            }}
          />
        ) : null}
      </div>
    </main>
  );
}
