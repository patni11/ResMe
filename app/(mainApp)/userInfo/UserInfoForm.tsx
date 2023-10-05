"use client";
import { FC } from "react";
import { UserInfo } from "./pageType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { Button } from "@/components/ui/button";
import LightText from "@/components/Text";
import { PlusCircle, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface UserInfoFormProps {
  addData: (projectData: UserInfo) => void;
  defaultValues?: UserInfo;
}

const UserInfoSchema = z.object({
  id: z.string().optional(),
  displayName: z.string().nonempty({ message: "Display name is required" }),
  contactInfo: z
    .array(
      z.object({
        contact: z
          .string()
          .nonempty({ message: "Can't be empty, or remote it" }),
      })
    )
    .optional(),
  location: z.string().optional(),
  links: z
    .array(
      z.object({
        linkName: z
          .string()
          .nonempty({ message: "Can't be empty, or remote it" }),
        link: z.string().nonempty({ message: "Can't be empty, or remote it" }),
      })
    )
    .optional(),
});

const UserInfoForm: FC<UserInfoFormProps> = ({ defaultValues, addData }) => {
  const form = useForm<UserInfo>({
    resolver: zodResolver(UserInfoSchema),
    defaultValues: defaultValues
      ? defaultValues
      : {
          displayName: "",
          // contactInfo: [{ contact: "" }],
          location: "",
          // links: [{ linkName: "", link: "" }],
          id: "",
        },
    mode: "onSubmit",
  });

  const handleFormSubmit = (data: UserInfo) => {
    console.log("Handle Form Submit", data);
    let projectData = data;
    if (!data.id) {
      const uniqueId = uuidv4();
      projectData = {
        ...data,
        id: uniqueId,
      };
    }
    addData(projectData);
  };

  const {
    register,
    formState: { errors },
  } = form;
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

  console.log(errors);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="flex flex-col space-y-12"
        >
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Your Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Your Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />

          <div className="flex flex-col space-y-4">
            <FormLabel className="text-lg">
              Your Contact Info <LightText>optional</LightText>
            </FormLabel>
            <FormDescription>
              This includes your email, phone, or any other resource you need in
              your resume.
            </FormDescription>
            <section className="flex flex-col space-y-4">
              {contactFields.map((field, index) => {
                return (
                  <div key={field.id} className="flex space-x-4">
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter Your Contact info"
                          {...register(`contactInfo.${index}.contact`)}
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
                      <FormMessage />
                    </FormItem>
                  </div>
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
            <FormLabel className="text-lg">
              Your Links <LightText>optional</LightText>
            </FormLabel>
            <FormDescription>
              This includes your twitter, linkedin, or any other resource you
              need in your resume
            </FormDescription>
            <section className="flex flex-col space-y-4">
              {linkFields.map((field, index) => {
                return (
                  <div key={field.id} className="flex space-x-4">
                    <Input
                      placeholder="Your Link Name"
                      {...register(`links.${index}.linkName`)}
                    />
                    <Input
                      placeholder="https://"
                      {...register(`links.${index}.link`)}
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
                  </div>
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
                <FormDescription>
                  If you want to add location to your Resume ex: San Francisco,
                  CA
                </FormDescription>
                <FormControl>
                  <Input placeholder="Enter Location" {...field} />
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
