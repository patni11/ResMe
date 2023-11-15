import Link from "next/link";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { buttonVariants } from "../ui/button";
// import {
//   LoginLink,
//   RegisterLink,
//   getKindeServerSession,
// } from "@kinde-oss/kinde-auth-nextjs/server";
import UserAccountNav from "./UserBox/UserAccountNav";
import MobileNav from "./MobileNav";
import { ModeToggle } from "../UIButtons/Theme";

const Navbar = () => {
  // const { getUser } = getKindeServerSession();
  // const user = getUser();

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            <span>Res&apos;Me</span>
          </Link>

          <MobileNav />

          <div className="hidden items-center space-x-4 sm:flex">
            <Link
              href="/pricing"
              className={`${buttonVariants({
                variant: "ghost",
                size: "sm",
              })} hover:border hover:border-blue-600 hover:bg-transparent`}
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

            <UserAccountNav />

            {/* <ModeToggle /> */}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
