"use client";

import { useSidebarStore } from "../lib/store";

export const Sidebar = () => {
  const sidebarElements = [
    { id: "pomodoro", name: "Pomodoro", icon: "🍅" },
    { id: "todo", name: "Todo", icon: "📝" },
    { id: "sounds", name: "Ambient Sounds", icon: "🌊" },
    { id: "quote", name: "Quote", icon: "💬" },
    { id: "background", name: "Change Background", icon: "🖼️" },
  ];

  const selected = useSidebarStore((state) => state.selected);
  const setSelected = useSidebarStore((state) => state.setSelected);

  return (
    <div className="bg-white h-screen dark:bg-gray-900 shadow-md p-2 sm:p-4 w-14 sm:w-64 transition-all duration-300">
      {/* Vesperal Branding */}
      <div className="mb-6 sm:mb-8 px-2 sm:px-3">
        <h1 className="hidden sm:block text-2xl font-extrabold tracking-wide text-[#7a4545] dark:text-[#e2b6b6]">
          Vesperal
        </h1>
        <h1 className="block sm:hidden text-xl font-bold text-[#7a4545] dark:text-[#e2b6b6] text-center">
          V
        </h1>
      </div>

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
            {element.icon}
          </span>
          <span className="hidden sm:inline text-base font-medium">
            {element.name}
          </span>
        </div>
      ))}
    </div>
  );
};
