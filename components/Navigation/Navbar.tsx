import Link from "next/link";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { buttonVariants } from "../ui/button";
// import {
//   LoginLink,
//   RegisterLink,
//   getKindeServerSession,
// } from "@kinde-oss/kinde-auth-nextjs/server";
import MobileNav from "./MobileNav";
import Image from "next/image";
import resmeLogo from "@/public/resmeLogo.svg";
import { UserBoxPage } from "./UserBox/UserBoxPage";
const Navbar = () => {
  // const { getUser } = getKindeServerSession();
  // const user = getUser();

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-10 items-center">
            <Image
              src={resmeLogo}
              style={{ width: "auto" }}
              className="h-8"
              alt="logo"
              quality={70}
            />

            {/* <span className="font-semibold">ResMe</span> */}
          </Link>

          <MobileNav />

          <div className="hidden items-center space-x-4 sm:flex">
            <Link
              href="/support"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              Support
            </Link>

            <Link
              href="/pricing"
              className={`${buttonVariants({
                variant: "ghost",
                size: "sm",
              })}  border border-transparent hover:border-blue-600 bg-transparent hover:bg-transparent`}
            >
              <span className="text-blue-600 font-semibold">Premium</span>
            </Link>

            <Link
              href="/dashboard"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              Dashboard
            </Link>

            <UserBoxPage />

            {/* <ModeToggle /> */}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
