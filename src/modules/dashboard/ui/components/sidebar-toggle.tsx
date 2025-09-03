"use client";

import { useEffect, useState } from "react";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { DashboardCommand } from "./dashboard-command";

export const SidebarToggle = () => {
  const [commandOpen, setCommandOpen] = useState(false);

  const { toggleSidebar, state, isMobile } = useSidebar();

  // useEffect(() => {
  //   const down = (e: KeyboardEvent) => {
  //     if ((e.metaKey || e.ctrlKey) && e.key === "k") {
  //       e.preventDefault();

  //       setCommandOpen((open) => !open);
  //     }
  //   };

  //   document.addEventListener("keydown", down);

  //   return () => document.removeEventListener("keydown", down);
  // }, []);

  const PanelIcon =
    state === "collapsed" || isMobile ? PanelLeftIcon : PanelLeftCloseIcon;

  return (
    <>
      <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />

      <nav className="bg-background flex items-center gap-x-2 border-b px-4 py-3">
        <Button
          variant="outline"
          onClick={() => toggleSidebar()}
          className="size-9"
        >
          <PanelIcon className="size-4" />
        </Button>

        {/* <Button
          variant="outline"
          size="sm"
          onClick={() => setCommandOpen((open) => !open)}
          className="text-muted-foreground hover:text-muted-foreground flex h-9 w-[240px] justify-start font-normal"
        >
          <SearchIcon />
          <p>Search</p>

          <kbd className="bg-muted text-muted-foreground pointer-events-none ml-auto inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[12px] font-medium select-none">
            <span className="text-[8px]">&#8984;</span>K
          </kbd>
        </Button> */}
      </nav>
    </>
  );
};
