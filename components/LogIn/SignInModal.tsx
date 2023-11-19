"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useSession } from "next-auth/react";
import GoogleButton from "./GoogleAuthButton";
import { useSearchParams, useRouter } from "next/navigation";

import { UserFormData } from "./ZodSchema";
import { useEffect, useState } from "react";

export function SignInModal() {
  const params = useSearchParams()!;
  const session = useSession();
  const router = useRouter();

  if (session.status === "authenticated") {
    router?.push("/dashboard");
  }

  const [error, setError] = useState<string | null>("");

  useEffect(() => {
    setError(params.get("error"));
  }, [params]);

  // const form = useForm<UserFormData>({
  //   resolver: zodResolver(UserSchema),
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //   },
  //   mode: "onSubmit",
  // });

  const handleFormSubmit = async (data: UserFormData) => {
    // const { email, password } = data;
    // const res = await signIn("credentials", {
    //   email,
    //   password,
    //   redirect: false,
    // });
    // console.log(res);
    // if (res?.error) {
    //   toast({
    //     title: `${res.error}, please try again or register!`,
    //   });
    // } else {
    //   toast({
    //     title: `Welcome Back ${email} 😄`,
    //   });
    // }
  };

  return (
    <Card>
      <CardHeader className="space-y-1 min-w-[350px]">
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>Enter your details to Sign In</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <GoogleButton />
      </CardContent>
    </Card>
    // <Form {...form}>
    //   <form
    //     onSubmit={form.handleSubmit(handleFormSubmit)}
    //     className="flex flex-col space-y-12"
    //   >
    //     <Card>
    //       <CardHeader className="space-y-1 min-w-[350px]">
    //         <CardTitle className="text-2xl">
    //           <h1>Sign In</h1>
    //         </CardTitle>
    //         <CardDescription>Enter your details to Sign In</CardDescription>
    //       </CardHeader>
    //       <CardContent className="grid gap-4">
    //         <GoogleButton />
    //         {/* <FaceBook />
    //         <GithubAuthButton /> */}
    //         {/*
    //         <div className="relative">
    //           <div className="absolute inset-0 flex items-center">
    //             <span className="w-full border-t" />
    //           </div>
    //           <div className="relative flex justify-center text-xs uppercase">
    //             <span className="bg-background px-2 text-muted-foreground">
    //               Or continue with
    //             </span>
    //           </div>
    //         </div>
    //         <div className="grid gap-2">
    //           <FormField
    //             control={form.control}
    //             name="email"
    //             render={({ field }) => (
    //               <FormItem>
    //                 <FormLabel>Email</FormLabel>
    //                 <FormControl>
    //                   <Input placeholder="Enter Your Email:" {...field} />
    //                 </FormControl>
    //                 <FormMessage />
    //               </FormItem>
    //             )}
    //           />
    //         </div>
    //         <div className="grid gap-2">
    //           <FormField
    //             control={form.control}
    //             name="password"
    //             render={({ field }) => (
    //               <FormItem>
    //                 <FormLabel>Password</FormLabel>
    //                 <FormControl>
    //                   <Input
    //                     placeholder="Enter Your Password:"
    //                     {...field}
    //                     type="password"
    //                   />
    //                 </FormControl>
    //                 <FormMessage />
    //               </FormItem>
    //             )}
    //           />
    //         </div> */}
    //       </CardContent>
    //       {/* <CardFooter className="flex flex-col space-y-2 justify-center">
    //         <Button className="w-full" type="submit">
    //           Sign In
    //         </Button>
    //         <div className="flex items-center text-sm space-x-4">
    //           <span>Don&apos;t Have an Account?</span>
    //           <Link
    //             href="/signup"
    //             className="font-semibold hover:text-[#3b82f6]"
    //           >
    //             Sign Up!
    //           </Link>
    //         </div>
    //       </CardFooter> */}
    //     </Card>
    //   </form>
    // </Form>
  );
}
