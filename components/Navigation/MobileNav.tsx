"use client";

import { ArrowRight, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
const MobileNav = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  const pathname = usePathname();

  // useEffect(() => {
  //   if (isOpen) toggleOpen();
  //   console.log("OPENED NAVBAR", isOpen);
  // }, [pathname, isOpen]);

  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      toggleOpen();
    }
  };

  const { data: session } = useSession();

  return (
    <div className="sm:hidden">
      <Menu
        onClick={toggleOpen}
        className="relative z-50 h-5 w-5 text-zinc-700"
      />

      {isOpen ? (
        <div className="fixed animate-in slide-in-from-top-5 fade-in-20 inset-0 z-0 w-full">
          <ul className="absolute bg-white border-b border-zinc-200 shadow-xl grid w-full gap-3 px-10 pt-20 pb-8">
            {!session || !session.user ? (
              <>
                <li>
                  <Link
                    onClick={() => closeOnCurrent("/login")}
                    className="flex items-center w-full font-semibold text-green-600"
                    href="/login"
                  >
                    Sign In
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => closeOnCurrent("/pricing")}
                    className="flex items-center w-full font-semibold"
                    href="/pricing"
                  >
                    Premium
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    onClick={() => closeOnCurrent("/dashboard")}
                    className="flex items-center w-full font-semibold"
                    href="/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="my-3 h-px w-full bg-gray-300" />
                <li>
                  <Link
                    onClick={() => closeOnCurrent("/dashboard")}
                    className="flex items-center w-full font-semibold"
                    href="/support"
                  >
                    Support
                  </Link>
                </li>
                <li className="my-3 h-px w-full bg-gray-300" />
                <li>
                  <Link
                    href="/profile"
                    onClick={() => closeOnCurrent("/dashboard")}
                    className="flex items-center w-full font-semibold cursor-pointer"
                  >
                    Profile
                  </Link>
                </li>
                <li className="my-3 h-px w-full bg-gray-300" />
                <li>
                  <button
                    onClick={() => {
                      signOut();
                    }}
                    className="flex items-center w-full font-semibold hover:text-destructive"
                  >
                    Log out
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default MobileNav;
