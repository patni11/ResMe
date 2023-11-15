"use client";
import { useMemo } from "react";
import Frame from "react-frame-component";
import {
  A4_HEIGHT_PX,
  A4_WIDTH_PX,
  A4_WIDTH_PT,
  LETTER_HEIGHT_PX,
  LETTER_WIDTH_PX,
  LETTER_WIDTH_PT,
} from "./constants";
import dynamic from "next/dynamic";
import { getAllFontFamiliesToLoad } from "@/components/fonts/lib";

const getIframeInitialContent = (isA4: boolean) => {
  const width = isA4 ? A4_WIDTH_PT : LETTER_WIDTH_PT;
  const allFontFamilies = getAllFontFamiliesToLoad();

  const allFontFamiliesPreloadLinks = allFontFamilies
    .map(
      (
        font
      ) => `<link rel="preload" as="font" href="/fonts/${font}-Regular.ttf" type="font/ttf" crossorigin="anonymous">
<link rel="preload" as="font" href="/fonts/${font}-Bold.ttf" type="font/ttf" crossorigin="anonymous">`
    )
    .join("");

  const allFontFamiliesFontFaces = allFontFamilies
    .map(
      (
        font
      ) => `@font-face {font-family: "${font}"; src: url("/fonts/${font}-Regular.ttf");}
@font-face {font-family: "${font}"; src: url("/fonts/${font}-Bold.ttf"); font-weight: bold;}`
    )
    .join("");

  return `<!DOCTYPE html>
<html>
  <head>
    ${allFontFamiliesPreloadLinks}
    <style>
      ${allFontFamiliesFontFaces}
    </style>
  </head>
  <body style='overflow: hidden; width: ${width}pt; margin: 0; padding: 0; -webkit-text-size-adjust:none;'>
    <div></div>
  </body>
</html>`;
};

/**
 * Iframe is used here for style isolation, since react pdf uses pt unit.
 * It creates a sandbox document body that uses letter/A4 pt size as width.
 */
// const ResumeIframe = ({
//   documentSize,
//   scale,
//   children,
//   enablePDFViewer = true,
//   totalPages,
// }: {
//   documentSize: string;
//   scale: number;
//   children: React.ReactNode;
//   totalPages: number;
//   enablePDFViewer?: boolean;
// }) => {
//   const isA4 = documentSize === "A4";
//   const iframeInitialContent = useMemo(
//     () => getIframeInitialContent(isA4),
//     [isA4]
//   );

//   if (enablePDFViewer) {
//     return (
//       <DynamicPDFViewer className="h-full w-full" showToolbar={false}>
//         {children as any}
//       </DynamicPDFViewer>
//     );
//   }
//   const width = isA4 ? A4_WIDTH_PX : LETTER_WIDTH_PX;
//   const height = isA4 ? A4_HEIGHT_PX : LETTER_HEIGHT_PX;

//   return (
//     <div
//       style={{
//         maxWidth: `${width * scale}px`,
//         maxHeight: `${height * scale}px`,
//       }}
//     >
//       {/* There is an outer div and an inner div here. The inner div sets the iframe width and uses transform scale to zoom in/out the resume iframe.
//         While zooming out or scaling down via transform, the element appears smaller but still occupies the same width/height. Therefore, we use the
//         outer div to restrict the max width & height proportionally */}
//       <div
//         style={{
//           width: `${width}px`,

//           transform: `scale(${scale})`,
//         }}
//         className={`origin-top-left bg-white shadow-lg overflow-auto h-screen`}
//       >
//         <Frame
//           style={{ width: "100%" }}
//           initialContent={iframeInitialContent}
//           // key is used to force component to re-mount when document size changes
//           key={isA4 ? "A4" : "LETTER"}
//           className="overflow-auto h-screen"
//         >
//           {children}
//         </Frame>
//       </div>
//     </div>
//   );
// };

const ResumeIframe = ({
  documentSize,
  scale,
  children,
  enablePDFViewer = true,
  totalPages,
}: {
  documentSize: string;
  scale: number;
  children: React.ReactNode;
  totalPages: number;
  enablePDFViewer?: boolean;
}) => {
  const isA4 = documentSize === "A4";
  const iframeInitialContent = useMemo(
    () => getIframeInitialContent(isA4),
    [isA4]
  );

  const width = isA4 ? A4_WIDTH_PX : LETTER_WIDTH_PX;
  const singlePageHeight = isA4 ? A4_HEIGHT_PX : LETTER_HEIGHT_PX;
  const totalHeight = singlePageHeight * totalPages; // Total height for all pages

  if (enablePDFViewer) {
    return (
      <DynamicPDFViewer className="h-full w-full" showToolbar={false}>
        {children as any}
      </DynamicPDFViewer>
    );
  }

  return (
    <div
      style={{
        // width: `${width * scale}px`,
        // height: `${singlePageHeight * scale}px`, // Fixed height for visible area
        overflowY: totalPages > 1 ? "auto" : "hidden", // Scrollable if more than one page
        //minHeight: `${singlePageHeight * scale}px`,
        position: "relative",
        maxWidth: `${width * scale}px`,
        maxHeight: `${singlePageHeight * scale}px`,
      }}
      className={`example ${
        totalPages > 1 ? "overflow-y-auto" : ""
      } overflow-x-hidden bg-white`}
    >
      <div
        style={{
          width: `${width}px`,
          height: `${totalHeight * (totalPages > 1 ? scale : 1)}px`, // Height to include all pages
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          // minHeight: `${singlePageHeight * scale}px`,
        }}
        className="bg-white overflow-hidden"
      >
        <Frame
          style={{ width: "100%", height: "100%" }} // Frame takes the full size of its parent
          initialContent={iframeInitialContent}
          key={isA4 ? "A4" : "LETTER"}
        >
          {children}
        </Frame>
      </div>
    </div>
  );
};

/**
 * Load iframe client side since iframe can't be SSR
 */
export const ResumeIframeCSR = dynamic(() => Promise.resolve(ResumeIframe), {
  ssr: false,
});

// PDFViewer is only used for debugging. Its size is quite large, so we make it dynamic import
const DynamicPDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((module) => module.PDFViewer),
  {
    ssr: false,
  }
);
