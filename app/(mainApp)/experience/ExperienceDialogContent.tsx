// @prefix reactForm
// @description
"use client";
import { FC } from "react";
import { Experience } from "./pageTypes";
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import {
  deleteExperience,
  updateExperience,
} from "@/lib/actions/experience.actions";
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
          className="flex flex-col space-y-8"
        >
          <div className="flex flex-row justify-between ">
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
                  <FormLabel>Location</FormLabel>
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
                  <FormLabel>Role</FormLabel>
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
                  <FormLabel>Experience Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    name={field.name}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
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

          <div className="flex flex-row justify-between">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
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

            <div className="flex flex-col space-y-4 justify-center">
              {!isWorking && (
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date</FormLabel>
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
                              {field.value instanceof Date ? (
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
                            selected={
                              field.value instanceof Date
                                ? field.value
                                : undefined
                            }
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date("1900-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
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
