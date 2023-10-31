"use client";
import { FC, useEffect } from "react";
import { FormCardWrapper } from "./FormCardWrapper";
import { createCertificateInfo } from "@/store/certificatesInfo";
import { HideButtons } from "@/components/UIButtons/HideButtons";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Certificate } from "@/app/(mainApp)/education/pageTypes";

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
}

export const CertificateSectionCard: FC<CertificateSectionCard> = ({
  certificateID,
}) => {
  const useCertificatesInfo = createCertificateInfo(certificateID);
  const {
    certificates,
    hiddenCertificates,
    hideAll,
    setHideAll,
    setHiddenCertificate,
    fetchCertificates,
  } = useCertificatesInfo();

  useEffect(() => {
    let certificatesLocalStorage = localStorage.getItem(certificateID);
    if (!certificatesLocalStorage) {
      fetchCertificates();
    }
  }, [fetchCertificates]);

  return (
    <FormCardWrapper
      cardTitle="Certificate"
      refreshFunction={() => fetchCertificates()}
      hideAll={hideAll}
      deleteFunction={setHideAll}
    >
      {certificates.map((certificate) => {
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
