import { FC, useState } from "react";
import { Certificate } from "./pageTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { v4 as uuidv4 } from "uuid";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { DialogFooter } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";

const CertificateSchema = z.object({
  certificateId: z.string().optional(),
  certificateName: z
    .string()
    .nonempty({
      message: "Certificate Name is Required",
    })
    .default(""),
  organization: z
    .string()
    .nonempty({
      message: "Organization Name is Required",
    })
    .default(""),
  issueDate: z.date().default(new Date()),
});

interface CertificateDialogContentProps {
  addData: (certificateData: Certificate) => void;
  defaultValues?: Certificate;
}

const CertificateDialogContent: FC<CertificateDialogContentProps> = ({
  addData,
  defaultValues,
}) => {
  const form = useForm<Certificate>({
    resolver: zodResolver(CertificateSchema),
    defaultValues: defaultValues
      ? defaultValues
      : {
          certificateName: "",
          organization: "",
          issueDate: new Date(),
        },
    mode: "onSubmit",
  });

  const handleFormSubmit = (data: Certificate) => {
    console.log("Handle Certificate Form Submit", data);
    let educationDataWithId = data;
    if (!data.certificateId) {
      const uniqueId = uuidv4();
      educationDataWithId = {
        ...data,
        certificateId: uniqueId,
      };
    }
    addData(educationDataWithId);

    document.getElementById("closeDialog")?.click();
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="flex flex-col space-y-8"
        >
          {/* Certificate Name */}
          <FormField
            control={form.control}
            name="certificateName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Certificate Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter School Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="organization"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Issuing Organization</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Stanford" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="issueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Issue Date</FormLabel>
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
          <DialogFooter className="flex flex-row">
            <DialogTrigger>
              <Button variant="outline" id="closeDialog">
                Cancel
              </Button>
            </DialogTrigger>

            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};

export default CertificateDialogContent;
