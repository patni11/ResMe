"use client";
import { UserInfo } from "@/lib/types/types";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserInfoFormProps {
  defaultValues?: UserInfo;
}

const UserInfoSchema = z.object({
  email: z.string().optional(),
  displayName: z.string().min(1, { message: "Display name is required" }),
  contactInfo: z
    .array(
      z.object({
        contactName: z
          .string()
          .min(1, { message: "Enter value or remove it" })
          .refine((value) => !value.includes("."), {
            message: "Link name should not contain a period ('.')",
          }),
        contact: z.string().min(1, { message: "Enter value or remote it" }),
      })
    )
    .optional(),
  location: z.string().optional(),
  links: z
    .array(
      z.object({
        linkName: z
          .string()
          .min(1, { message: "Enter value or remove it" })
          .refine((value) => !value.includes("."), {
            message: "Link name should not contain a period ('.')",
          }),
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
      contactInfo: defaultValues?.contactInfo || [
        { contactName: "", contact: "" },
      ],
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
            <section className="flex flex-col space-y-4 w-full">
              {contactFields.map((field, index) => {
                return (
                  <FormItem
                    key={field.id}
                    className="flex space-x-4 space-y-0 items-center"
                  >
                    <FormField
                      control={form.control}
                      name={`contactInfo.${index}.contactName`}
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            name={field.name}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Contact Type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Email">Email</SelectItem>
                              <SelectItem value="Phone">Phone</SelectItem>
                              <SelectItem value="Mailing Address">
                                Mailing Address
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      name={`contactInfo.${index}.contact`}
                      render={({}) => (
                        <FormItem>
                          <Input
                            placeholder="email@gmail.com"
                            {...register(`contactInfo.${index}.contact`)}
                            className={`${inputFields}`}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />

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
                  </FormItem>
                );
              })}
            </section>

            <Button
              type="button"
              onClick={() => appendContact({ contactName: "", contact: "" })}
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
            <section className="flex flex-col space-y-4 w-full">
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
                <FormLabel className={`${headingClass}`}>
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

export const UserInfoFormOnboarding = ({
  defaultValues,
}: {
  defaultValues?: UserInfo;
}) => {
  const { toast } = useToast();

  const form = useForm<UserInfo>({
    resolver: zodResolver(UserInfoSchema),
    defaultValues: {
      displayName: defaultValues?.displayName || "",
      contactInfo: defaultValues?.contactInfo || [
        { contactName: "", contact: "" },
      ],
      location: defaultValues?.location || "",
      links: defaultValues?.links || [{ linkName: "", link: "" }],
      email: defaultValues?.email || "",
    },
    mode: "onSubmit",
  });

  const handleFormSubmit = async (data: UserInfo) => {
    await updateResumeHeaderInfo(data);
    toast({
      title: "User Info Saved :)",
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

  const headingClass = "text-sm md:text-md m-0 p-0";
  const inputFields = "text-sm md:text-md";
  const descriptionClass = "text-sm md:text-base m-0 p-0";
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="flex flex-col space-y-4 m-8 lg:m-0"
        >
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={`${headingClass}`}>Your Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter name you want on your resume (Ex: John Wick)"
                    {...field}
                    className={`${inputFields}`}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <FormLabel className={`${headingClass}`}>
                Your Contact Info
              </FormLabel>
              <FormDescription className={`${descriptionClass}`}>
                This includes your email, phone, or any other resource you need
                in your resume.
              </FormDescription>
            </div>
            <section className="flex flex-col space-y-4 w-full">
              {contactFields.map((field, index) => {
                return (
                  <FormItem
                    key={field.id}
                    className="flex space-x-4 space-y-0 items-center w-full"
                  >
                    <FormField
                      control={form.control}
                      name={`contactInfo.${index}.contactName`}
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            name={field.name}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Contact Type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="w-36">
                              <SelectItem value="Email">Email</SelectItem>
                              <SelectItem value="Phone">Phone</SelectItem>
                              <SelectItem value="Mailing Address">
                                Mailing Address
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      name={`contactInfo.${index}.contact`}
                      render={({}) => (
                        <FormItem>
                          <Input
                            placeholder="Ex: johnwick@gmail.com"
                            {...register(`contactInfo.${index}.contact`)}
                            onChange={(e) => {
                              // Additional logic to adjust size based on content
                              e.target.size = Math.max(
                                20,
                                e.target.value.length
                              );
                            }}
                            className={`${inputFields} w-full`}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                  </FormItem>
                );
              })}
            </section>
            <Button
              type="button"
              variant="default"
              onClick={() => appendContact({ contactName: "", contact: "" })}
              className="max-w-[fit-content]"
            >
              <PlusCircle className="w-4 h-4"></PlusCircle>
            </Button>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <FormLabel className={`${headingClass}`}>Your Links</FormLabel>
              <FormDescription className={`${descriptionClass}`}>
                This includes your twitter, linkedin, or any other resource you
                need in your resume
              </FormDescription>
            </div>
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

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={`${headingClass}`}>Location</FormLabel>
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

          <div className="flex justify-end w-full">
            <Button type="submit" className="w-16">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
