// @prefix reactForm
// @description
"use client";
import { FC } from "react";
import { Project } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import "@/app/styles/datePicker/datePicker.css";
import DatePicker from "react-datepicker";
import * as z from "zod";
import { v4 as uuidv4 } from "uuid";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { CalendarIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import { DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import LightText from "@/components/Text";
import {
  updateProject,
  deleteProject,
} from "@/lib/actions/userProject.actions";
import { useToast } from "@/components/ui/use-toast";
import { AIHelper } from "@/components/Cards/AIHelper";

const ProjectSchema = z
  .object({
    _id: z.string().optional(),
    projectName: z
      .string()
      .nonempty({
        message: "Project Name is required",
      })
      .default(""),
    location: z.string().optional().default(""),
    positionTitle: z.string().optional().default(""),
    description: z
      .string()
      .nonempty({
        message: "Description is required",
      })
      .default(""),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
  })
  .refine(
    (data) => {
      // If both dates are provided, check that endDate is not earlier than startDate
      if (data.startDate && data.endDate) {
        return data.endDate >= data.startDate;
      }
      // If only one of the dates is provided or neither, the validation is passed
      return true;
    },
    {
      message: "End date should not be less than start date.",
      path: ["endDate"], // specifies that this refinement is for the endDate field
    }
  );

interface ProjectDialogContentProps {
  defaultValues?: Project;
  email: string;
  path?: string;
}

const ProjectDialogContent: FC<ProjectDialogContentProps> = ({
  defaultValues,
  email,
  path,
}) => {
  const validatePath = path || "/projects";
  const { toast } = useToast();
  const form = useForm<Project>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: defaultValues
      ? defaultValues
      : {
          projectName: "",
          location: "",
          positionTitle: "",
          description: "",
          _id: "",
        },
    mode: "onSubmit",
  });

  const handleDelete = async () => {
    if (defaultValues?._id) {
      await deleteProject(defaultValues?._id, validatePath);
      toast({
        title: `Deleted Project 🎈: ${defaultValues.projectName} `,
      });
      document.getElementById("closeDialog")?.click();
    } else {
      toast({
        title: "No Value to delete, please try again",
      });
    }
  };

  const handleFormSubmit = (data: Project) => {
    let projectData = data;
    if (!data._id) {
      const uniqueId = uuidv4();
      projectData = {
        ...data,
        _id: uniqueId,
      };
    }

    toast({
      title: `Project Updated 🥳: ${projectData.projectName} `,
    });
    updateProject(projectData, email, validatePath);
    document.getElementById("closeDialog")?.click();
  };

  const {
    formState: { errors },
  } = form;

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="flex flex-col space-y-4 md:space-y-8"
        >
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between ">
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Project Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Location
                    <LightText>optional</LightText>
                  </FormLabel>

                  <FormControl>
                    <Input placeholder="Enter Location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-row justify-between">
            <FormField
              control={form.control}
              name="positionTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Role
                    <LightText>optional</LightText>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Role" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between ">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    Start Date
                    <LightText>optional</LightText>
                  </FormLabel>
                  <FormControl>
                    <DatePicker
                      selected={field.value || new Date()}
                      onChange={(date) => field.onChange(date)}
                      dateFormat="MM/yyyy"
                      showMonthYearPicker
                      // className="my-custom-datepicker-class"
                      showIcon
                      icon={<CalendarIcon className="h-4 w-4 opacity-50" />}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    End Date
                    <LightText>optional</LightText>
                  </FormLabel>
                  <FormControl>
                    <DatePicker
                      selected={field.value || new Date()}
                      onChange={(date) => field.onChange(date)}
                      dateFormat="MM/yyyy"
                      showMonthYearPicker
                      // className="my-custom-datepicker-class"
                      showIcon
                      icon={<CalendarIcon className="h-4 w-4 opacity-50" />}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center w-full">
                  <div>
                    <FormLabel>Description</FormLabel>
                    <FormDescription>
                      Separate each point with a new line
                    </FormDescription>
                  </div>
                  <AIHelper
                    userMessage={field.value}
                    setMessage={(message: string) => {
                      field.onChange(message);
                    }}
                  />
                </div>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a bit about your contributions in different lines"
                    {...field}
                    className="h-28 md:h-48"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter className="flex flex-row space-x-4">
            <Button
              variant="outline"
              type="button"
              id="none"
              className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
              disabled={!defaultValues?._id}
              onClick={handleDelete}
            >
              Delete
            </Button>
            <DialogTrigger>
              <div
                className={buttonVariants({ variant: "outline" })}
                id="closeDialog"
              >
                Cancel
              </div>
            </DialogTrigger>

            <Button type="submit" id="none">
              Save
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};

export default ProjectDialogContent;
