"use client";
import { useSidebarStore } from "../lib/store";
import { Background } from "./Background";
import { DefaultBackground } from "./DefaultBackground";
import { Pomodoro } from "./Pomodoro";
import { Quote } from "./Quote";
import { Sounds } from "./Sounds";
import { Todo } from "./Todo";

export const Main = () => {
  const selected = useSidebarStore((state) => state.selected);

  const selectComponent = () => {
    switch (selected) {
      case "pomodoro":
        return <Pomodoro />;
      case "todo":
        return <Todo />;
      // case "sounds":
      //   return <Sounds />;
      case "quote":
        return <Quote />;
      case "background":
        return <Background />;
      default:
        return null;
    }
  };

  return (
    <div className="relative flex-1 h-full overflow-hidden text-black">
      <DefaultBackground />

      {/* Foreground component */}
      <div className="absolute inset-0 z-10">
        {["quote", "pomodoro", "todo"].includes(selected) ? (
          <div className="flex items-center justify-center p-4 sm:p-6 md:p-8 h-full">
            <div className="w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto">
              {selectComponent()}
            </div>
          </div>
        ) : (
          selectComponent()
        )}
      </div>
    </div>
  );
};
