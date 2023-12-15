import { Page, View, Document } from "@react-pdf/renderer";
import { createSettings } from "@/store/coverLetter/settings";
import { spacing, styles } from "../ResumeComponents/ReactPDF/styles";
import { SuppressResumePDFErrorMessage } from "../PDFComponents/common/SuppressResumePDFErrorMessage";
import { CoverLetterSettings } from "@/lib/types/coverLetter/types";

/**
 * Note: CoverLetter is supposed to be rendered inside PDFViewer. However,
 * PDFViewer is rendered too slow and has noticeable delay as you enter
 * the coverLetter form, so we render it without PDFViewer to make it render
 * instantly. There are 2 drawbacks with this approach:
 * 1. Not everything works out of box if not rendered inside PDFViewer,
 *    e.g. svg doesn't work, so it takes in a isPDF flag that maps react
 *    pdf element to the correct dom element.
 * 2. It throws a lot of errors in console log, e.g. "<VIEW /> is using incorrect
 *    casing. Use PascalCase for React components, or lowercase for HTML elements."
 *    in development, causing a lot of noises. We can possibly workaround this by
 *    mapping every react pdf element to a dom element, but for now, we simply
 *    suppress these messages in <SuppressCoverLetterErrorMessage />.
 *    https://github.com/diegomura/react-pdf/issues/239#issuecomment-487255027
 */
export const CoverLetterPDF = ({
  CoverLetterID,
  settings,
}: {
  settings: CoverLetterSettings;
  CoverLetterID: string;
}) => {
  const { bgColor, fontColor, fontFamily, fontSize, headerSize, documentType } =
    settings;
  return (
    <>
      <Document title={`CoverLetter`} producer={"ResMe"}>
        <Page
          size={documentType.toUpperCase() as "A4" | "LETTER"}
          style={{
            ...styles.flexCol,

            color: fontColor,
            fontFamily,
            fontSize: fontSize + "pt",
            padding: `${spacing["10"]} ${spacing["10"]}`,
          }}
        >
          {Boolean(fontColor) && (
            <View
              style={{
                width: spacing["full"],
                height: spacing[3.5],
                backgroundColor: fontColor,
              }}
            />
          )}
          <View
            style={{
              ...styles.flexCol,
              padding: `${spacing[0]} ${spacing[20]}`,
            }}
          ></View>
        </Page>
      </Document>
      <SuppressResumePDFErrorMessage />
    </>
  );
};
