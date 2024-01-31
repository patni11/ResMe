import html2pdf from "html2pdf.js";
import { createCoverLetterSettings } from "@/store/coverLetter/settings";
import { ItemsButton } from "./Header";
import { Save } from "lucide-react";
import * as gtag from "@/lib/gtag";
const ExportPDF = () => {
  const userCoverLetterSettings = createCoverLetterSettings("1");
  const { documentType } = userCoverLetterSettings();
  const handleExport = () => {
    const element = document.getElementById("element-to-print");

    const opt = {
      jsPDF: {
        format: documentType === "Letter" ? "letter" : "A4",
      },
    };
    html2pdf().from(element).set(opt).save();

    // //html2pdf().set(opt).from(element).toPdf().save("myfile.pdf");
    // html2pdf().set(opt).from(element).toPdf().save("myfile.pdf");
    gtag.event({
      clientWindow: window,
      action: "Export Cover letter",
      category: "cover letter",
      label: "Exported Coverletter",
    });
  };

  return (
    <ItemsButton
      onClick={() => {
        console.log("Save PDF");
        handleExport();
      }}
      tooltipText="Download PDF"
    >
      <Save className="h-5 w-5 download" />
    </ItemsButton>
  );
};
export default ExportPDF;
