"use client";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
//import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { EducationType } from "./pageTypes";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/components/ui/use-toast";
import {
  deleteEducation,
  updateEducation,
} from "@/lib/actions/education.actions";

const EducationFormSchema = z
  .object({
    _id: z.string().optional(),
    schoolName: z
      .string()
      .min(1, {
        message: "School Name cannot be empty",
      })
      .default(""),
    major: z
      .string()
      .min(1, {
        message: "Major cannot be empty",
      })
      .default(""),
    degreeType: z
      .string()
      .min(1, {
        message: "DegreeType cannot be empty",
      })
      .default(""),
    gpa: z.number().positive().multipleOf(0.01).min(0).max(10).default(0),
    startDate: z
      .date({
        required_error: "A start date is required.",
      })
      .default(new Date()),
    endDate: z
      .date({
        required_error: "An end date or expected end date is required.",
      })
      .default(new Date()),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date should not be less than start date.",
    path: ["endDate"], // specifies that this refinement is for the endDate field
  });

//export type AddEducationFormType = z.infer<typeof EducationFormSchema>;

interface EducationDialogContentProps {
  email: string;
  defaultValues?: EducationType;
}

export const EducationDialogContent: FC<EducationDialogContentProps> = ({
  email,
  defaultValues,
}) => {
  const { toast } = useToast();
  const form = useForm<EducationType>({
    resolver: zodResolver(EducationFormSchema),
    defaultValues: defaultValues
      ? defaultValues
      : {
          schoolName: "",
          major: "",
          degreeType: "",
          gpa: 0,
          startDate: new Date(),
          endDate: new Date(),
        },
    mode: "onSubmit",
  });
  const {
    formState: { errors },
    register,
  } = form;

  const handleDelete = async () => {
    if (defaultValues?._id) {
      await deleteEducation(defaultValues?._id, "/education");
      toast({
        title: `Deleted Education 🎈: ${defaultValues.schoolName} `,
      });
    } else {
      toast({
        title: "No Value to delete, please try again",
      });
    }
  };

  const handleFormSubmit = (data: EducationType) => {
    let educationDataWithId = data;
    if (!defaultValues || !defaultValues._id) {
      const uniqueId = uuidv4();
      educationDataWithId = {
        ...data,
        _id: uniqueId,
      };
    } else {
      educationDataWithId = {
        ...data,
        _id: defaultValues._id,
      };
    }

    toast({
      title: `Education Updated 🥳: ${educationDataWithId.schoolName} `,
    });
    updateEducation(educationDataWithId, email, "/education");

    document.getElementById("closeDialog")?.click();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="flex flex-col space-y-8"
      >
        {/* School Name */}
        <FormField
          control={form.control}
          name="schoolName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>School Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter School Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Major, Degree, GPA */}
        <div className="flex flex-row space-x-8">
          <FormField
            control={form.control}
            name="major"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Major</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Major" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="degreeType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Degree Type</FormLabel>
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
                    <SelectItem value="High School">High School</SelectItem>
                    <SelectItem value="Bachelor's">Bachelor&apos;s</SelectItem>
                    <SelectItem value="Master's">Master&apos;s</SelectItem>
                    <SelectItem value="PhD">PhD</SelectItem>
                    <SelectItem value="Associate">Associate&apos;s</SelectItem>
                    <SelectItem value="Doctorate">Doctorate</SelectItem>
                    <SelectItem value="PharmD">PharmD</SelectItem>
                    <SelectItem value="JD">JD</SelectItem>
                    <SelectItem value="MD">MD</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gpa"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>GPA</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      max="10"
                      step="0.01"
                      placeholder="GPA"
                      {...register("gpa", {
                        setValueAs: (value) => Number(value),
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        {/** Date pickers */}
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
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
  );
};
