import ContentSection from "@/components/Sections/ContentSection";
import { PlusCircleIcon, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth/next";
import authOptions, { Session } from "@/lib/authOptions";
import { Certificate } from "./pageTypes";
import { FC } from "react";
import { fetchCertificates } from "@/lib/actions/certificates.action.";
import CertificateCard from "./certificateCard";
import CertificateDialogContent from "./CertificateDialogContent";

interface EducationSectionProps {}

const EducationSection: FC<EducationSectionProps> = async () => {
  const session: Session | null = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error("User not found");
  }

  console.log("Rloading Certificate Section");

  const certificates: Certificate[] | null = JSON.parse(
    JSON.stringify(await fetchCertificates(session.user.email))
  );

  return (
    <ContentSection
      cardDetails={{
        title: "Add Certificates",
        description: "Add Diplomas, Online Course/Bootcamp Certificates",
      }}
      dialogDetails={{
        dialogTitle: "Add Certificate",
        dialogTrigger: (
          <Button>
            Add <PlusCircleIcon className="ml-1.5 h-5 w-5" />
          </Button>
        ),
        dialogContent: <CertificateDialogContent email={session.user.email} />,
      }}
    >
      {!certificates || certificates.length <= 0 ? (
        <div className="flex text-sm text-accent-foreground justify-center w-full font-semibold italic">
          {" "}
          <p>You do not have any certificates. Add some</p>{" "}
        </div>
      ) : (
        <div className="flex flex-col space-y-2">
          {certificates.map((certificateVal: Certificate) => {
            certificateVal = {
              certificateName: certificateVal.certificateName,
              organization: certificateVal.organization,
              issueDate: certificateVal.issueDate
                ? new Date(certificateVal.issueDate)
                : certificateVal.issueDate,
              _id: certificateVal._id,
            };
            return (
              <CertificateCard
                key={certificateVal._id}
                cardDetails={certificateVal}
                dialogDetails={{
                  dialogTitle: "Edit Certificate",
                  dialogTrigger: (
                    <Button variant="ghost">
                      <Settings2 className="w-5 h-5"></Settings2>
                    </Button>
                  ),
                  dialogContent: (
                    <CertificateDialogContent
                      defaultValues={certificateVal}
                      email={session.user.email}
                    />
                  ),
                }}
              />
            );
          })}
        </div>
      )}
    </ContentSection>
  );
};

export default EducationSection;