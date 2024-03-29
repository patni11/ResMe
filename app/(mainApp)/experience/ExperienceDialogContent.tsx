// @prefix reactForm
// @description
"use client";
import { FC } from "react";
import { Experience } from "@/lib/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { v4 as uuidv4 } from "uuid";
import "react-datepicker/dist/react-datepicker.css";
import "@/app/styles/datePicker/datePicker.css";
import DatePicker from "react-datepicker";
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button, buttonVariants } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import {
  deleteExperience,
  updateExperience,
} from "@/lib/actions/experience.actions";
import { AIHelper } from "@/components/Cards/AIHelper";
import LightText from "@/components/Text";
const ExperienceSchema = z
  .object({
    _id: z.string().optional(),
    company: z
      .string()
      .nonempty({
        message: "Company Name is required",
      })
      .default(""),
    location: z.string().default(""),
    positionTitle: z.string().default(""),
    experienceType: z.string().default(""),
    description: z.string().default(""),
    startDate: z.date().default(new Date()),
    link: z.string().optional(),
    endDate: z
      .union([
        z.date({
          required_error: "An end date is required.",
        }),
        z.literal("working"),
      ])
      .default("working"),
  })
  .refine(
    (data) => {
      if (data.endDate === "working") {
        return true;
      }
      if (data.endDate instanceof Date && data.startDate instanceof Date) {
        return data.endDate >= data.startDate;
      }
      // If endDate is not a date and not "working", this will fall through to the else block.
      return false; // this line can be omitted as it's the default behavior
    },
    {
      message: "End date should not be less than start date.",
      path: ["endDate"], // specifies that this refinement is for the endDate field
    }
  );

interface ExperienceDialogContentProps {
  email: string;
  defaultValues?: Experience;
  path?: string;
}

const ExperienceDialogContent: FC<ExperienceDialogContentProps> = ({
  email,
  defaultValues,
  path,
}) => {
  const validatePath = path || "/experience";
  const { toast } = useToast();
  const form = useForm<Experience>({
    resolver: zodResolver(ExperienceSchema),
    defaultValues: defaultValues
      ? defaultValues
      : {
          company: "",
          location: "",
          positionTitle: "",
          experienceType: "",
          startDate: new Date(),
          endDate: "working",
          link: "",
          description: "",
          _id: "",
        },
    mode: "onSubmit",
  });

  const handleDelete = async () => {
    if (defaultValues?._id) {
      await deleteExperience(defaultValues?._id, validatePath);
      toast({
        title: `Deleted Experience 🎈: ${defaultValues.company} `,
      });
      document.getElementById("closeDialog")?.click();
    } else {
      toast({
        title: "No Value to delete, please try again",
      });
    }
  };

  const handleFormSubmit = (data: Experience) => {
    let experienceData = data;
    if (!data._id) {
      const uniqueId = uuidv4();
      experienceData = {
        ...data,
        _id: uniqueId,
      };
    }
    //addData(experienceData);
    toast({
      title: `Experience Updated 🥳: ${experienceData.company} `,
    });
    updateExperience(experienceData, email, validatePath);
    document.getElementById("closeDialog")?.click();
  };

  const { watch, setValue } = form;

  const endDateValue = watch("endDate");
  const isWorking = endDateValue === "working";

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="flex flex-col space-y-4 md:space-y-8"
        >
          <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row justify-between">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Company" {...field} />
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
                    Location <LightText>optional</LightText>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row justify-between">
            <FormField
              control={form.control}
              name="positionTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Role <LightText>optional</LightText>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Role" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="experienceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Experience Type <LightText>optional</LightText>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    name={field.name}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Degree" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Internship">Internship</SelectItem>
                      <SelectItem value="Part-Time">Part-Time</SelectItem>
                      <SelectItem value="Fulltime">Full-Time</SelectItem>
                      <SelectItem value="Freelance">Freelance</SelectItem>
                      <SelectItem value="Founder">Founder</SelectItem>
                      <SelectItem value="Club">Club</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row justify-between">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      dateFormat="MM/yyyy"
                      showMonthYearPicker
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col space-y-4 justify-center">
              {!isWorking && (
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <DatePicker
                          selected={
                            field.value instanceof Date
                              ? field.value
                              : undefined
                          }
                          onChange={(date) => field.onChange(date)}
                          dateFormat="MM/yyyy"
                          showMonthYearPicker
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="working"
                  checked={isWorking}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setValue("endDate", "working");
                    } else {
                      setValue("endDate", new Date());
                    }
                  }}
                />
                <label
                  htmlFor="working"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Currently Working
                </label>
              </div>
            </div>
          </div>

          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Link
                  <LightText>optional</LightText>
                </FormLabel>

                <FormControl>
                  <Input placeholder="Enter URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

export default ExperienceDialogContent;
