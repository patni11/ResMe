"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { PlusCircleIcon, Settings2, Trash2 } from "lucide-react";
import { FC, useReducer } from "react";
import EductionSection from "./educationSection";

import { Education } from "./educationTypes";
import EducationCard from "./eductionCard";
import { AddEducationDialogContent } from "./addEducationDialogContent";
import { DialogTrigger } from "@radix-ui/react-dialog";

interface EducationProps {}

interface Action {
  type: "edit" | "add" | "delete";
  payload?: Education;
}

function reducer(state: Education[], action: Action): Education[] {
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

  const [state, dispatch] = useReducer(reducer, []);

  return (
    <main className="flex justify-center w-full h-full">
      <div className="flex flex-col w-[80%] items-center py-12 space-y-8">
        <EductionSection
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
            dialogContent: <AddEducationDialogContent addData={addEducation} />,
          }}
        >
          {state.map((educationVal: Education) => {
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
                      className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2></Trash2>
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
                  ), //TODO: Add delete functionality
                }}
                dialogDetails={{
                  dialogTitle: "Edit Education",
                  dialogTrigger: (
                    <Button variant="ghost">
                      <Settings2></Settings2>
                    </Button>
                  ),
                  dialogContent: (
                    <AddEducationDialogContent
                      addData={updateEducation}
                      defaultValues={educationVal}
                    />
                  ),
                }}
              />
            );
          })}
        </EductionSection>

        <section className="w-full justify-start">
          <Card className="w-[full] border-none">
            <CardHeader>
              <CardTitle>Add Certificates</CardTitle>
              <CardDescription>
                Add Diplomas, Online Course/Bootcamp Certificates
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/** Add loop here for multiple universities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    <span>Stanford DS & Algo Course</span>
                    <Button variant="ghost">
                      <Settings2></Settings2>
                    </Button>
                  </CardTitle>
                  <CardDescription className="flex justify-between">
                    <span>
                      Learned about graphs, hashmaps, linked lists and few other
                      algos
                    </span>
                    {/** just the completed in date */}
                    <span>2022</span>
                  </CardDescription>
                </CardHeader>
              </Card>
              {/** End loop here */}
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>
                Add <PlusCircleIcon className="ml-1.5 h-5 w-5"></PlusCircleIcon>
              </Button>
            </CardFooter>
          </Card>
        </section>
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
