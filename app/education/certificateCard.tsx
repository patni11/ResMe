"use client";
import { FC, ReactNode } from "react";
import { CardContent } from "@/components/ui/card";
import { Certificate } from "./pageTypes";
import { getFormattedDate } from "../utils/FormattingFunctions";
import UpdateDialogCard from "@/components/Cards/UpdateDialogCard";

interface CertificateCardProps {
  className?: string;
  cardDetails: Certificate;
  dialogDetails?: {
    dialogTitle: string;
    dialogDescription?: string;
    dialogTrigger: ReactNode;
    dialogContent: ReactNode;
  };
  deleteDialogDetails?: {
    dialogTitle: string;
    dialogDescription?: string;
    dialogTrigger: ReactNode;
    dialogContent: ReactNode;
  };
}

const CertificateCard: FC<CertificateCardProps> = ({
  className,
  cardDetails,
  dialogDetails,
  deleteDialogDetails,
}) => {
  return (
    <UpdateDialogCard
      cardDetails={{ cardTitle: cardDetails.certificateName }}
      dialogDetails={dialogDetails}
      deleteDialogDetails={deleteDialogDetails}
    >
      <CardContent className="flex flex-col justify-between text-sm">
        <div className="flex justify-between">
          <span>{cardDetails.organization}</span>
          <span>
            {cardDetails.issueDate
              ? getFormattedDate(cardDetails.issueDate)
              : ""}
          </span>
        </div>
      </CardContent>
    </UpdateDialogCard>
  );
};

export default CertificateCard;
