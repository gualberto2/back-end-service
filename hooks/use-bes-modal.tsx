import { create } from "zustand";

interface useBesModalInterface {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useBesModal = create<useBesModalInterface>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
