import { FC } from "react";
import { SignInModal } from "@/components/LogIn/SignInModal";

interface SignInProps {}

const SignIn: FC<SignInProps> = () => {
  return (
    <main className="flex h-full w-full items-center justify-center ">
      <div className="flex items-center justify-center">
        <SignInModal />
      </div>
    </main>
  );
};

export default SignIn;
