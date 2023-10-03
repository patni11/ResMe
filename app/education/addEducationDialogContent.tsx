"use client";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
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
import { toast } from "@/components/ui/use-toast";
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
import { Education } from "./educationTypes";
import { v4 as uuidv4 } from "uuid";

const AddEducationFormSchema = z
  .object({
    id: z.string().optional(),
    schoolName: z.string().min(2, {
      message: "School Name must be at least 2 characters.",
    }),
    major: z.string().min(2, {
      message: "Major must be at least 2 characters.",
    }),
    degreeType: z.string().min(2, {
      message: "DegreeType must be at least 2 characters.",
    }),
    gpa: z.preprocess(
      (a) => parseInt(z.string().parse(a), 10),
      z.number().positive().multipleOf(0.01).min(0.1).max(10)
    ),
    startDate: z.date({
      required_error: "A start date is required.",
    }),
    endDate: z.date({
      required_error: "An end date is required.",
    }),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date should not be less than start date.",
    path: ["endDate"], // specifies that this refinement is for the endDate field
  });

//export type AddEducationFormValues = z.infer<typeof AddEducationFormSchema>;

interface AddEducationDialogContentProps {
  addData: (educationData: Education) => void;
  defaultValues?: Education;
}

export const AddEducationDialogContent: FC<AddEducationDialogContentProps> = ({
  addData,
  defaultValues,
}) => {
  const form = useForm<Education>({
    resolver: zodResolver(AddEducationFormSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const handleFormSubmit = (data: Education) => {
    console.log("Handle Form Submit", data);
    let educationDataWithId = data;
    if (!data.id) {
      const uniqueId = uuidv4();
      educationDataWithId = {
        ...data,
        id: uniqueId,
      };
    }
    addData(educationDataWithId);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={() => {
          form.handleSubmit(handleFormSubmit);
        }}
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
                >
                  <FormControl>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Degree" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="High School">High School</SelectItem>
                    <SelectItem value="Bachelor's">Bachelor's</SelectItem>
                    <SelectItem value="Master's">Master's</SelectItem>
                    <SelectItem value="PhD">PhD</SelectItem>
                    <SelectItem value="Associate">Associate's</SelectItem>
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
                      id="gpa"
                      type="number"
                      min="0"
                      max="10"
                      step="0.01"
                      placeholder="GPA"
                      value={Number(field.value)} // Convert the value to a number
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      ref={field.ref}
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
          <Button variant="outline">Cancel</Button>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
