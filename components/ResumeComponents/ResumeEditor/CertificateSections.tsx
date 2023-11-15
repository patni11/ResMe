"use client";

import { createCertificateInfo } from "@/store/certificatesInfo";
import ResumeComponentContainer from "./ResumeComponentContainer";

interface CertificateSectionProps {
  certificateID: string;
}

const CertificateSection: React.FC<CertificateSectionProps> = ({
  certificateID,
}) => {
  const useCertificatesInfo = createCertificateInfo(certificateID);
  const { certificates, hiddenCertificates, hideAll } = useCertificatesInfo();

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

  return (
    <ResumeComponentContainer>
      <div className="flex flex-col justify-start items-start w-full">
        {/* <h1 className="text-sm font-semibold"> EDUCATION </h1>
        <hr className="h-[3px] bg-black w-full mb-[0.5px] mt-[0.5px]" /> */}
        {certificatesString != "" ? (
          <p className="text-xs">
            <span className="font-semibold">Certifications: </span>
            {certificatesString}
          </p>
        ) : null}
      </div>
    </ResumeComponentContainer>
  );
};

export default CertificateSection;
