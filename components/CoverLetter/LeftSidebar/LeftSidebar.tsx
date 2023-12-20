import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
import { useSettings } from "@/store/coverLetter/layout";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Left = () => {
  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const { toggleSidebar, sidebar } = useSettings();

  const handleOpen = () => toggleSidebar("left");

  return (
    <>
      <Button
        size="icon"
        onClick={handleOpen}
        variant="outline"
        className="absolute left-0 top-[50%]"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      <SwipeableDrawer
        open={sidebar.left.open}
        anchor="left"
        onOpen={handleOpen}
        onClose={handleOpen}
        PaperProps={{ className: "!shadow-lg" }}
        variant={isDesktop ? "persistent" : "temporary"}
        className="relative"
      >
        <div className="relative h-screen w-[0vw] md:w-[40vw] xl:w-[30vw] 2xl:w-[20vw] bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50 relative flex border-r-2 border-zinc-50/10">
          <button
            onClick={handleOpen}
            className="absolute -right-1 top-[50%] py-4 bg-zinc-50 border rounded-l-md drop-shadow-md"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <main className="overflow-y-scroll p-4">Left Sidebar</main>
        </div>
      </SwipeableDrawer>
    </>
  );
};

export default Left;
