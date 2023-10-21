"use client";
import { FC } from "react";
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
import { useToast } from "@/components/ui/use-toast";
import {
  deleteCertificate,
  updateCertificate,
} from "@/lib/actions/certificates.action.";

const CertificateSchema = z.object({
  _id: z.string().optional(),
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
  email: string;
  defaultValues?: Certificate;
}

const CertificateDialogContent: FC<CertificateDialogContentProps> = ({
  email,
  defaultValues,
}) => {
  const { toast } = useToast();
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

  const handleDelete = async () => {
    if (defaultValues?._id) {
      await deleteCertificate(defaultValues?._id, "/education");
      toast({
        title: `Deleted Certificate 🎈: ${defaultValues.certificateName} `,
      });
    } else {
      toast({
        title: "No Value to delete, please try again",
      });
    }
  };

  const handleFormSubmit = (data: Certificate) => {
    console.log("Handle Certificate Form Submit", data);
    let educationDataWithId = data;
    if (!data._id) {
      const uniqueId = uuidv4();
      educationDataWithId = {
        ...data,
        _id: uniqueId,
      };
    }
    toast({
      title: `Certificate Updated 🥳: ${educationDataWithId.certificateName} `,
    });
    updateCertificate(educationDataWithId, email, "/education");

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

export default CertificateDialogContent;
