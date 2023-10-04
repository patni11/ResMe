"use client";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, Settings2, Trash2 } from "lucide-react";
import { FC, useReducer } from "react";
import ContentSection from "@/components/Sections/ContentSection";

import { Certificate, Education } from "./pageTypes";
import EducationCard from "./eductionCard";
import { EducationDialogContent } from "./EducationDialogContent";
import { DialogTrigger } from "@radix-ui/react-dialog";
import CertificateDialogContent from "./CertificateDialogContent";
import CertificateCard from "./certificateCard";

interface EducationProps {}

interface EducationAction {
  type: "edit" | "add" | "delete";
  payload?: Education;
}

function reducer(state: Education[], action: EducationAction): Education[] {
  const { type, payload } = action;
  switch (type) {
    case "delete":
      return state.filter((education) => education.id !== payload?.id);

    case "edit":
      return state.map((education) =>
        education.id === payload?.id ? { ...education, ...payload } : education
      );

    case "add":
      return payload ? [...state, payload] : state;
    default:
      return state;
  }
}

interface CertificateAction {
  type: "edit" | "add" | "delete";
  payload?: Certificate;
}

function certificateReducer(
  state: Certificate[],
  action: CertificateAction
): Certificate[] {
  const { type, payload } = action;

  switch (type) {
    case "delete":
      return state.filter(
        (certificate) => certificate.certificateId !== payload?.certificateId
      );

    case "edit":
      return state.map((certificate) =>
        certificate.certificateId === payload?.certificateId
          ? { ...certificate, ...payload }
          : certificate
      );

    case "add":
      return payload ? [...state, payload] : state;
    default:
      return state;
  }
}

const Education: FC<EducationProps> = () => {
  console.log("Loading Education Page");

  const updateEducation = (educationData: Education) => {
    console.log("Update Education", educationData);
    dispatch({
      type: "edit",
      payload: educationData,
    });
  };

  const deleteEducation = (educationData: Education) => {
    console.log("Delete Education", educationData);
    dispatch({
      type: "delete",
      payload: educationData,
    });
  };

  const addEducation = (addEducaitonData: Education) => {
    console.log("Add Education", addEducaitonData);
    const { schoolName, major, degreeType, startDate, endDate, gpa, id } =
      addEducaitonData;

    const payload = {
      schoolName: schoolName,
      major: major,
      degreeType: degreeType,
      gpa: gpa,
      startDate: startDate,
      endDate: endDate,
      id: id,
      error: null,
    };

    dispatch({
      type: "add",
      payload,
    });
  };

  const addCertificate = (addCertificateData: Certificate) => {
    console.log("Add Certificate", addCertificateData);

    certificateDispatch({
      type: "add",
      payload: addCertificateData,
    });
  };

  const deleteCertificate = (certificateData: Certificate) => {
    console.log("Delete Certificate", certificateData);
    certificateDispatch({
      type: "delete",
      payload: certificateData,
    });
  };

  const updateCertificate = (certificateData: Certificate) => {
    console.log("Update Certificate", certificateData);
    certificateDispatch({
      type: "edit",
      payload: certificateData,
    });
  };

  const [educationState, dispatch] = useReducer(reducer, []);
  const [certificateState, certificateDispatch] = useReducer(
    certificateReducer,
    []
  );

  return (
    <main className="flex justify-center w-full h-full">
      <div className="flex flex-col w-[80%] items-center py-12 space-y-8">
        <ContentSection
          cardDetails={{
            title: "Add Education",
            description:
              "Add schools, universities, bootcamps you have attended",
          }}
          dialogDetails={{
            dialogTitle: "Add Education",
            dialogTrigger: (
              <Button>
                Add <PlusCircleIcon className="ml-1.5 h-5 w-5" />
              </Button>
            ),
            dialogContent: <EducationDialogContent addData={addEducation} />,
          }}
        >
          {educationState.map((educationVal: Education) => {
            return (
              <EducationCard
                key={educationVal.id}
                cardDetails={{
                  schoolName: educationVal.schoolName,
                  major: educationVal.major,
                  gpa: educationVal.gpa,
                  degreeType: educationVal.degreeType,
                  startDate: educationVal.startDate,
                  endDate: educationVal.endDate,
                  id: educationVal.id,
                }}
                deleteDialogDetails={{
                  dialogTitle: "Delete Education",
                  dialogDescription:
                    "Are you sure you want to delete this education?",
                  dialogTrigger: (
                    <Button
                      variant="ghost"
                      className={
                        "text-destructive hover:bg-destructive hover:text-destructive-foreground text-sm"
                      }
                    >
                      <Trash2 className="w-5 h-5"></Trash2>
                    </Button>
                  ),
                  dialogContent: (
                    <DialogTrigger className="flex justify-between">
                      <Button variant="outline">Cancel</Button>
                      <Button
                        type="submit"
                        variant="outline"
                        className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => deleteEducation(educationVal)}
                      >
                        Delete
                      </Button>
                    </DialogTrigger>
                  ),
                }}
                dialogDetails={{
                  dialogTitle: "Edit Education",
                  dialogTrigger: (
                    <Button variant="ghost">
                      <Settings2 className="w-5 h-5"></Settings2>
                    </Button>
                  ),
                  dialogContent: (
                    <EducationDialogContent
                      addData={updateEducation}
                      defaultValues={educationVal}
                    />
                  ),
                }}
              />
            );
          })}
        </ContentSection>

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
            dialogContent: (
              <CertificateDialogContent addData={addCertificate} />
            ),
          }}
        >
          {certificateState.map((certificateVal: Certificate) => {
            return (
              <CertificateCard
                key={certificateVal.certificateId}
                cardDetails={{
                  certificateName: certificateVal.certificateName,
                  organization: certificateVal.organization,
                  issueDate: certificateVal.issueDate,
                  certificateId: certificateVal.certificateId,
                }}
                deleteDialogDetails={{
                  dialogTitle: "Delete Certificate",
                  dialogDescription:
                    "Are you sure you want to delete this certificate?",
                  dialogTrigger: (
                    <Button
                      variant="ghost"
                      className={
                        "text-destructive hover:bg-destructive hover:text-destructive-foreground text-sm"
                      }
                    >
                      <Trash2 className="w-5 h-5"></Trash2>
                    </Button>
                  ),
                  dialogContent: (
                    <DialogTrigger className="flex justify-between">
                      <Button variant="outline">Cancel</Button>
                      <Button
                        type="submit"
                        variant="outline"
                        className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => deleteCertificate(certificateVal)}
                      >
                        Delete
                      </Button>
                    </DialogTrigger>
                  ),
                }}
                dialogDetails={{
                  dialogTitle: "Edit Certificate",
                  dialogTrigger: (
                    <Button variant="ghost">
                      <Settings2 className="w-5 h-5"></Settings2>
                    </Button>
                  ),
                  dialogContent: (
                    <CertificateDialogContent
                      addData={updateCertificate}
                      defaultValues={certificateVal}
                    />
                  ),
                }}
              />
            );
          })}
        </ContentSection>
      </div>
    </main>
  );
};

export default Education;

{
  /* <section className="w-full justify-start">
<Card className="w-[full] border-none">
  <CardHeader>
    <CardTitle>Add Education</CardTitle>
    <CardDescription>
      Add schools, universities, bootcamps you have attended
    </CardDescription>
  </CardHeader>
  <CardContent>
    
  
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>Northeastern Univeristy</span>
          <Button variant="ghost">
            <Settings2></Settings2>
          </Button>
        </CardTitle>
        <CardDescription className="flex justify-between">
          <span>
            Honors student with Bachelor's in Computer Science and
            Economics
          </span>
          <span>2021-2025</span>
        </CardDescription>
      </CardHeader>
    </Card>
    

  </CardContent>
  <CardFooter className="flex justify-end">
    <Button>
      Add <PlusCircleIcon className="ml-1.5 h-5 w-5"></PlusCircleIcon>
    </Button>
  </CardFooter>
</Card>
</section> */
}
