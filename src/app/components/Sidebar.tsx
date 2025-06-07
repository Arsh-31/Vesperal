"use client";

import TimerIcon from "@mui/icons-material/Timer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TuneIcon from "@mui/icons-material/Tune";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import { useSidebarStore } from "../lib/store";

export const Sidebar = () => {
  const sidebarElements = [
    { id: "pomodoro", name: "Pomodoro", icon: TimerIcon },
    { id: "todo", name: "Todo", icon: CheckCircleIcon },
    { id: "sounds", name: "Ambient Sounds", icon: TuneIcon },
    { id: "quote", name: "Quote", icon: FormatQuoteIcon },
    { id: "background", name: "Change Background", icon: WallpaperIcon },
  ];

  const selected = useSidebarStore((state) => state.selected);
  const setSelected = useSidebarStore((state) => state.setSelected);

  return (
    <div className="bg-white h-screen dark:bg-gray-900 shadow-md p-2 sm:p-4 w-14 sm:w-64 transition-all duration-300">
      {/* Sidebar Items */}
      {sidebarElements.map((element) => (
        <div
          onClick={() => setSelected(element.id)}
          key={element.id}
          className={`flex items-center gap-3 sm:gap-4 p-2 my-1 text-gray-700 dark:text-gray-300 
          rounded-lg cursor-pointer transition-all duration-200
          hover:bg-[#f7eaea] dark:hover:bg-gray-800/50
          ${
            selected === element.id
              ? "bg-[#f4d7d7] dark:bg-[#5c3b3b] font-semibold shadow-inner text-[#7a4545] dark:text-[#e2b6b6]"
              : ""
          }`}
        >
          <span role="img" aria-label={element.name} className="text-xl">
            <element.icon />
          </span>
          <span className="hidden sm:inline text-base font-medium pt-1">
            {element.name}
          </span>
        </div>
      ))}
    </div>
  );
};
