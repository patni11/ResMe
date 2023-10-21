import { Eye, EyeOff } from "lucide-react";
import { ReactNode } from "react";
export const HideButtons = ({
  hide,
  setHide,
  children,
}: {
  hide: boolean;
  setHide: () => void;
  children?: ReactNode;
}) => {
  return (
    <button className="flex space-x-2 items-center text-sm" onClick={setHide}>
      {!hide ? <Eye className="w-4 h-4" /> : <EyeOff className="w-3 h-3" />}
      {children}
    </button>
  );
};
