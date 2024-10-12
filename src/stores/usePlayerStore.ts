import { create } from "zustand";

interface IHeaderStore {
  videoKey: string;
  setVideoKey: (value: string) => void;
}

export const usePlayerStore = create<IHeaderStore>((set) => ({
  videoKey: "",
  setVideoKey: (value) => set({ videoKey: value }),
}));
