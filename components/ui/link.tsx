import { Link } from "lucide-react";
import { FC, ReactNode } from "react";

interface SideBarLinkProps {
  children?: ReactNode;
  href: string;
}
const SideBarLink: FC<SideBarLinkProps> = ({ children, href }) => {
  return (
    <div className="flex w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80">
      <Link href={href}>Home</Link>
    </div>
  );
};

export default SideBarLink;
