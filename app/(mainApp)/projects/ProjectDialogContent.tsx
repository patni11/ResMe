// @prefix reactForm
// @description
"use client";
import { FC } from "react";
import { Project } from "./pageTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import LightText from "@/components/Text";
import {
  updateProject,
  deleteProject,
} from "@/lib/actions/userProject.actions";
import { useToast } from "@/components/ui/use-toast";
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
      if (data.endDate && data.startDate) {
        return data.endDate >= data.startDate;
      }
      return true; // If there's no endDate, the refinement passes by default.
    },
    {
      message: "End date should not be less than start date.",
      path: ["endDate"], // specifies that this refinement is for the endDate field
    }
  );

interface ProjectDialogContentProps {
  defaultValues?: Project;
  email: string;
}

const ProjectDialogContent: FC<ProjectDialogContentProps> = ({
  defaultValues,
  email,
}) => {
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
      await deleteProject(defaultValues?._id, "/projects");
      toast({
        title: `Deleted Project 🎈: ${defaultValues.projectName} `,
      });
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
    console.log(projectData);
    toast({
      title: `Project Updated 🥳: ${projectData.projectName} `,
    });
    updateProject(projectData, email, "/projects");
    document.getElementById("closeDialog")?.click();
  };

  const {
    formState: { errors },
  } = form;
  console.log(errors);
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="flex flex-col space-y-8"
        >
          <div className="flex flex-row justify-between ">
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

          <div className="flex flex-row justify-between">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    Start Date
                    <LightText>optional</LightText>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-4 h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
                    Start Date
                    <LightText>optional</LightText>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-4 h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/** TODO: add end date */}
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormDescription>
                  Separate each point with a new line
                </FormDescription>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a bit about your contributions in different lines"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
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
              <Button variant="outline" id="closeDialog">
                Cancel
              </Button>
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
