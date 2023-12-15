import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
import { right } from "@/lib/types/coverLetter/types";
import { useSettings } from "@/store/coverLetter/layout";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  ChevronLeft,
  ChevronLeftCircle,
  ChevronRight,
} from "lucide-react";

const RightSidebar = () => {
  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const { toggleSidebar, sidebar } = useSettings();

  const handleOpen = () => toggleSidebar("right");

  return (
    <>
      <Button
        size="icon"
        onClick={handleOpen}
        variant="outline"
        className="absolute right-0"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <SwipeableDrawer
        open={sidebar.right.open}
        anchor="right"
        onOpen={handleOpen}
        onClose={handleOpen}
        PaperProps={{ className: "!shadow-lg" }}
        variant={isDesktop ? "persistent" : "temporary"}
        className="relative"
      >
        <div className="relative h-screen w-[0vw] md:w-[40vw] xl:w-[30vw] 2xl:w-[20vw] bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50 relative flex border-l-2 border-zinc-50/10">
          <button
            onClick={handleOpen}
            className="absolute -left-1 top-[50%] py-4 bg-zinc-50 border rounded-r-md drop-shadow-md"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <main className="overflow-y-scroll p-4">
            {right.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="grid gap-4 pt-4 pb-4 first:pt-0 border-b border-zinc-900/10 last:border-b-0 dark:border-zinc-50/10"
              >
                <section.component />
              </section>
            ))}
          </main>
        </div>
      </SwipeableDrawer>
    </>
  );
};

export default RightSidebar;
