"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { UserFormData, UserSchema } from "./ZodSchema";
import GoogleButton from "./GoogleAuthButton";
import { createUser } from "@/lib/actions/user.actions";
import { updateResumeHeaderInfo } from "@/lib/actions/resumeHeaderInfo.actions";

export function SignUpModal() {
  const router = useRouter();
  const session = useSession();

  const { toast } = useToast();

  if (session.status === "authenticated") {
    router?.push("/dashboard");
  }

  const form = useForm<UserFormData>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const handleFormSubmit = async (data: UserFormData) => {
    console.log("Creating User", data);
    const { email, password } = data;

    try {
      await createUser({ email, password });
      console.log("creating resumeHeaderInfo");
      await updateResumeHeaderInfo({
        displayName: "",
        contactInfo: [{ contact: "" }],
        location: "",
        links: [{ linkName: "", link: "" }],
        email: email,
      });

      toast({
        title: `Welcome ${email} 😄`,
      });
    } catch (err: any) {
      toast({
        title: `${err}`,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="flex flex-col space-y-12"
      >
        <Card>
          <CardHeader className="space-y-1 min-w-[350px]">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <GoogleButton />

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Your Email:" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Your Password:"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 justify-center">
            <Button className="w-full" type="submit">
              Sign Up
            </Button>
            <div className="flex items-center text-sm space-x-4">
              <span>Already Have an Account?</span>
              <Link
                href="/login"
                className="font-semibold hover:text-[#3b82f6]"
              >
                Sign In!
              </Link>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
