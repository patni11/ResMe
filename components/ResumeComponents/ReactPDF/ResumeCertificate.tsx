import { View } from "@react-pdf/renderer";
import { ResumePDFText } from "./common";
import { styles, spacing } from "./styles";
import { State } from "@/store/certificatesInfo";
import { memo } from "react";
import { Certificate, CertificateStore } from "@/lib/types";
const ResumeCertificate = ({
  heading,

  certificatesData,
}: {
  heading: string;

  certificatesData: State;
}) => {
  const { certificates, hiddenCertificates, hideAll } = certificatesData;

  if (hideAll) {
    return null;
  }

  const certificatesString = certificates
    .filter(
      (certificate: Certificate) => !hiddenCertificates?.[certificate._id]
    ) // Filter out hidden certificates
    .map(
      (certificate: Certificate) =>
        `${certificate.organization}: ${certificate.certificateName}`
    )
    .join(", ");

  if (certificatesString === "") {
    return null;
  }

  return (
    <View
      style={{
        ...styles.flexRow,
        marginTop: spacing["1.5"],
        //gap: spacing["1"],
        flexWrap: "wrap", // ensure the text wraps
      }}
    >
      <ResumePDFText bold={true}>
        {heading}
        <ResumePDFText>{certificatesString}</ResumePDFText>
      </ResumePDFText>
    </View>
  );
};

export default memo(ResumeCertificate);
