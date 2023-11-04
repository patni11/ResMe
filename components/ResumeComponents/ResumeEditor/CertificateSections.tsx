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

// interface CertificateCardProps {
//   certificate: CertificateType;
//   hideGPA: boolean;
//   hideDate: boolean;
// }

// const CertificateCard: FC<CertificateCardProps> = ({
//   certificate,
//   hideGPA,
//   hideDate,
// }) => {
//   const gpa = certificate?.gpa ? parseDecimal(certificate.gpa) : 0;
//   return (
//     <div className="flex flex space-between text-xs w-full leading-tight mb-1">
//       <div className="flex flex-col w-full text-left">
//         {/* <p>Northeastern University</p> */}
//         <p className="font-bold">{certificate.schoolName}</p>
//         {/* <p>September 2021 - May 2025</p> */}
//         <p className="italic text-gray-500 font-normal">
//           {certificate.degreeType} {certificate.major}
//         </p>
//       </div>
//       <div className="flex flex-col font-light italic w-full text-right">
//         {/* <p>Bachelor&apos;s Computer Science</p> */}

//         {!hideDate ? (
//           <p className="font-bold">
//             {getFormattedDate(new Date(certificate.startDate))} -{" "}
//             {getFormattedDate(new Date(certificate.endDate))}
//           </p>
//         ) : null}
//         {!hideGPA ? <p> GPA: {gpa.toString()}</p> : null}
//       </div>
//     </div>
//   );
// };

export default CertificateSection;
