//import { getUserSubscriptionPlan } from "@/lib/stripe";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import Link from "next/link";
import { Gem } from "lucide-react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { Icons } from "../../Icons";

interface UserAccountNavProps {
  email: string | undefined;
  name: string;
}

const UserAccountNav = async ({ email, name }: UserAccountNavProps) => {
  //const subscriptionPlan = await getUserSubscriptionPlan();
  const isSubscribed = false;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative flex items-center py-6">
          <Avatar className="h-8 w-8 rounded-full border">
            <AvatarFallback>
              <span className="sr-only">{name}</span>
              <Icons.user className="h-4 w-4 text-zinc-900" />
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1 text-left w-36">
            <p className="text-xs font-medium leading-none truncate">{name}</p>
            <p className="text-xs text-muted-foreground truncate">{email}</p>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center justify-start gap-2 p-2">
            <div className="flex flex-col space-y-0.5 leading-none">
              {name && <p className="font-medium text-sm text-black">{name}</p>}
              {email && (
                <p className="w-[200px] truncate text-xs text-zinc-700">
                  {email}
                </p>
              )}
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem asChild>
          {subscriptionPlan?.isSubscribed ? (
            <Link href="/dashboard/billing">Manage Subscription</Link>
          ) : (
            <Link href="/pricing">
              Upgrade <Gem className="text-blue-600 h-4 w-4 ml-1.5" />
            </Link>
          )}
        </DropdownMenuItem> */}

        <DropdownMenuItem asChild>
          {isSubscribed ? (
            <Link href="/dashboard/billing" className="cursor-pointer">
              Manage Subscription
            </Link>
          ) : (
            <Link
              href="/pricing"
              className="text-blue-600 hover:text-blue-600 hover:font-semibold cursor-pointer"
            >
              Upgrade <Gem className="text-blue-600 h-4 w-4 ml-1.5" />
            </Link>
          )}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="cursor-pointer">
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            {" "}
            <Link href="/profile" className="cursor-pointer">
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            {" "}
            <Link href="/billing" className="cursor-pointer">
              Billing
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            {" "}
            <Link href="/settings" className="cursor-pointer">
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer">
          <LogoutLink className="hover:text-destructive hover:text-semibold">
            Log out
          </LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
