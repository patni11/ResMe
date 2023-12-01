"use client";
import { FC, memo } from "react";
import { FormCardWrapper } from "./FormCardWrapper";
import { createCertificateInfo } from "@/store/certificatesInfo";
import { HideButtons } from "@/components/UIButtons/HideButtons";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Certificate } from "@/lib/types";

interface CertificateCardProps {
  certificate: Certificate;
  hideCertificate: boolean;
  setHideCertificate: () => void;
}

const CertificateCard: FC<CertificateCardProps> = ({
  certificate,
  hideCertificate,

  setHideCertificate,
}) => {
  return (
    <>
      <Card className="mb-2">
        <CardHeader className="flex flex-row justify-between">
          <div className="flex flex-col space-y-2">
            <CardTitle>{certificate.certificateName}</CardTitle>
          </div>
          <div className="flex space-x-4">
            <HideButtons hide={hideCertificate} setHide={setHideCertificate}>
              <span>Certificate</span>
            </HideButtons>
          </div>
        </CardHeader>
      </Card>
    </>
  );
};
interface CertificateSectionCard {
  certificateID: string;
  index: number;
  moveUp: (index: number) => void;
  moveDown: (index: number) => void;
}

const CertificateSectionCard: FC<CertificateSectionCard> = ({
  certificateID,
  index,
  moveUp,
  moveDown,
}) => {
  const useCertificatesInfo = createCertificateInfo(certificateID);
  const {
    certificates,
    hiddenCertificates,
    hideAll,
    isLoading,
    setHideAll,
    setHiddenCertificate,
    fetchDefaultCertificates,
    fetchCertificates,
  } = useCertificatesInfo();

  return (
    <FormCardWrapper
      cardTitle="Certificate"
      refreshFunction={() => fetchDefaultCertificates()}
      refreshSection={() => fetchCertificates()}
      isLoading={isLoading}
      hideAll={hideAll}
      deleteFunction={setHideAll}
      index={index}
      moveUp={moveUp}
      moveDown={moveDown}
    >
      {certificates.map((certificate: any) => {
        return (
          <CertificateCard
            key={certificate._id}
            certificate={certificate}
            hideCertificate={hiddenCertificates![certificate._id]}
            setHideCertificate={() => setHiddenCertificate(certificate._id)}
          />
        );
      })}
    </FormCardWrapper>
  );
};

export default memo(CertificateSectionCard);
