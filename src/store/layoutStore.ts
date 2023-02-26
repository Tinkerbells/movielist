import { create } from "zustand";

interface ILayoutStore {
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (newValue: boolean) => void;
}

export const useLayoutStore = create<ILayoutStore>((set) => ({
  isSidebarCollapsed: true,
  setIsSidebarCollapsed: (newValue: boolean) =>
    set({ isSidebarCollapsed: newValue }),
}));
