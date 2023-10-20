import { FC } from "react";
import { SignUpModal } from "@/components/LogIn/SignUpModal";
interface SignUpProps {}

const SignUp: FC<SignUpProps> = () => {
  return (
    <main className="flex h-full w-full items-center justify-center ">
      <div className="flex items-center justify-center">
        <SignUpModal />
      </div>
    </main>
  );
};

export default SignUp;
