import { create } from "zustand";

interface BackgroundStore {
  backgroundUrl: string;
  setBackgroundUrl: (url: string) => void;
}

export const useBackgroundStore = create<BackgroundStore>((set) => ({
  backgroundUrl:
    "https://i.pinimg.com/736x/27/3f/78/273f78590ca87b05583215dcf21ff112.jpg", // default image
  setBackgroundUrl: (url) => set({ backgroundUrl: url }),
}));
