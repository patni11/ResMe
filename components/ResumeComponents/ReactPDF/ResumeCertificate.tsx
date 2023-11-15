import { View } from "@react-pdf/renderer";
import { ResumePDFText } from "./common";
import { styles, spacing } from "./styles";
import { State } from "@/store/certificatesInfo";
import { memo } from "react";

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
    .filter((certificate: any) => !hiddenCertificates?.[certificate._id]) // Filter out hidden certificates
    .map(
      (certificate: any) =>
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
        marginTop: spacing["0.5"],
        gap: spacing["1"],
      }}
    >
      <ResumePDFText bold={true}>{`${heading}`}</ResumePDFText>
      <ResumePDFText>{certificatesString}</ResumePDFText>
    </View>
  );
};

export default memo(ResumeCertificate);
