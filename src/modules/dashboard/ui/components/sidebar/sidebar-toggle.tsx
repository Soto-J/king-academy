"use client";

import { PanelLeftCloseIcon, PanelLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

export const SidebarToggle = () => {
  const { toggleSidebar, state, isMobile } = useSidebar();

  const PanelIcon =
    state === "collapsed" || isMobile ? PanelLeftIcon : PanelLeftCloseIcon;

  return (
    <nav className="from-background to-secondary/60 border-border/60 flex items-center gap-x-2 border-b bg-gradient-to-r px-6 py-4">
      <Button
        variant="outline"
        onClick={() => toggleSidebar()}
        className="bg-secondary size-10 shadow-md ring-2 ring-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:ring-white/20"
      >
        <PanelIcon
          className={`size-4 transition-all duration-300 ${
            state === "collapsed" || isMobile ? "rotate-0" : "rotate-180"
          }`}
        />
      </Button>
    </nav>
  );
};
