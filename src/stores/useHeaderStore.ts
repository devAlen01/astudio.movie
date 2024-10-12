import { create } from "zustand";

interface IHeaderStore {
  isOpen: boolean;
  isMobile: boolean;
  setIsOpen: (value: boolean) => void;
  setIsMobile: (value: boolean) => void;
}

export const useHeaderStore = create<IHeaderStore>((set) => ({
  isOpen: false,
  isMobile: true,
  setIsOpen: (value) => set({ isOpen: value }),
  setIsMobile: (value) => set({ isMobile: value }),
}));
