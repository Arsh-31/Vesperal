import { create } from "zustand";

type sidebarState = {
  selected: string;
  setSelected: (id: string) => void;
};

export const useSidebarStore = create<sidebarState>((set) => ({
  selected: "",
  setSelected: (id: string) => set({ selected: id }),
}));
