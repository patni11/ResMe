"use client";
import { UserInfo } from "./pageType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
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
import { Button } from "@/components/ui/button";
import LightText from "@/components/Text";
import { PlusCircle, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { usePathname } from "next/navigation";
import { updateResumeHeaderInfo } from "@/lib/actions/resumeHeaderInfo.actions";

interface UserInfoFormProps {
  defaultValues?: UserInfo;
}

const UserInfoSchema = z.object({
  email: z.string().optional(),
  displayName: z.string().min(1, { message: "Display name is required" }),
  contactInfo: z
    .array(
      z.object({
        contact: z.string().min(1, { message: "Enter value or remote it" }),
      })
    )
    .optional(),
  location: z.string().optional(),
  links: z
    .array(
      z.object({
        linkName: z.string().min(1, { message: "Enter value or remote it" }),
        link: z.string().min(1, { message: "Enter value or remote it" }),
      })
    )
    .optional(),
});

const UserInfoForm = ({ defaultValues }: UserInfoFormProps) => {
  const { toast } = useToast();
  const pathname = usePathname();

  const form = useForm<UserInfo>({
    resolver: zodResolver(UserInfoSchema),
    defaultValues: {
      displayName: defaultValues?.displayName || "",
      contactInfo: defaultValues?.contactInfo || [{ contact: "" }],
      location: defaultValues?.location || "",
      links: defaultValues?.links || [{ linkName: "", link: "" }],
      email: defaultValues?.email || "",
    },
    mode: "onSubmit",
  });

  const handleFormSubmit = async (data: UserInfo) => {
    await updateResumeHeaderInfo(data, pathname);
    toast({
      title: "User Info Saved ",
    });
  };

  const { register } = form;
  const {
    fields: contactFields,
    append: appendContact,
    remove: removeContact,
  } = useFieldArray({
    control: form.control,
    name: "contactInfo",
  });

  const {
    fields: linkFields,
    append: appendLink,
    remove: removeLink,
  } = useFieldArray({
    control: form.control,
    name: "links",
  });

  //console.log(errors);

  const headingClass = "text-md md:text-lg";
  const descriptionClass = "text-sm md:text-base";
  const inputFields = "text-sm md:text-base";

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="flex flex-col space-y-12 mt-8 md:mt-0"
        >
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={`${headingClass}`}>
                  Display Name
                </FormLabel>
                <FormDescription className={`${descriptionClass}`}>
                  This will be on top of your resume
                </FormDescription>
                <FormControl>
                  <Input
                    placeholder="Enter Display Name"
                    {...field}
                    className={`${inputFields}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />

          <div className="flex flex-col space-y-4">
            <FormLabel className={`${headingClass}`}>
              Your Contact Info <LightText>optional</LightText>
            </FormLabel>
            <FormDescription className={`${descriptionClass}`}>
              This includes your email, phone, or any other resource you need in
              your resume.
            </FormDescription>
            <section className="flex flex-col space-y-4">
              {contactFields.map((field, index) => {
                return (
                  <FormField
                    key={field.id}
                    name={`contactInfo.${index}.contact`}
                    render={({}) => (
                      <FormItem className="flex flex-col space-y-4">
                        <div className="flex space-x-4">
                          <FormControl>
                            <Input
                              placeholder="Enter Your Contact info"
                              {...register(`contactInfo.${index}.contact`)}
                              className={`${inputFields}`}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            onClick={() => removeContact(index)}
                            variant="ghost"
                            className={
                              "text-destructive hover:bg-destructive hover:text-destructive-foreground text-sm"
                            }
                          >
                            <Trash2 className="w-5 h-5"></Trash2>
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              })}
            </section>

            <Button
              type="button"
              onClick={() => appendContact({ contact: "" })}
              className="max-w-[fit-content]"
            >
              <PlusCircle className="w-5 h-5"></PlusCircle>
            </Button>
          </div>

          <Separator />

          <div className="flex flex-col space-y-4">
            <FormLabel className={`${headingClass}`}>
              Your Links <LightText>optional</LightText>
            </FormLabel>
            <FormDescription className={`${descriptionClass}`}>
              This includes your twitter, linkedin, or any other resource you
              need in your resume
            </FormDescription>
            <section className="flex flex-col w-full">
              {linkFields.map((field, index) => {
                return (
                  <FormItem
                    key={field.id}
                    className="flex space-x-4 space-y-0 items-center"
                  >
                    <FormField
                      name={`links.${index}.linkName`}
                      render={({}) => (
                        <FormItem>
                          <Input
                            placeholder="Ex: Github"
                            {...register(`links.${index}.linkName`)}
                            className={`${inputFields}`}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      name={`links.${index}.link`}
                      render={({}) => (
                        <FormItem>
                          <Input
                            placeholder="https://"
                            {...register(`links.${index}.link`)}
                            className={`${inputFields}`}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="button"
                      onClick={() => removeLink(index)}
                      variant="ghost"
                      className={
                        "text-destructive hover:bg-destructive hover:text-destructive-foreground text-sm"
                      }
                    >
                      <Trash2 className="w-5 h-5"></Trash2>
                    </Button>
                  </FormItem>
                );
              })}
            </section>

            <Button
              type="button"
              onClick={() => appendLink({ linkName: "", link: "" })}
              className="max-w-[fit-content]"
            >
              <PlusCircle className="w-5 h-5"></PlusCircle>
            </Button>
          </div>

          <Separator />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">
                  Location
                  <LightText>optional</LightText>
                </FormLabel>
                <FormDescription className={`${descriptionClass}`}>
                  If you want to add location to your Resume ex: San Francisco,
                  CA
                </FormDescription>
                <FormControl>
                  <Input
                    placeholder="Enter Location"
                    {...field}
                    className={`${inputFields}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Save</Button>
        </form>
      </Form>
    </>
  );
};

export default UserInfoForm;
