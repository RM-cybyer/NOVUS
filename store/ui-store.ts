"use client";

import { create } from "zustand";

/** UI chrome state for the app shell. Local client state only - never server data. */
interface UiState {
  sidebarCollapsed: boolean;
  paletteOpen: boolean;
  notificationsOpen: boolean;
  toggleSidebar: () => void;
  setPaletteOpen: (open: boolean) => void;
  setNotificationsOpen: (open: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  sidebarCollapsed: false,
  paletteOpen: false,
  notificationsOpen: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setPaletteOpen: (paletteOpen) => set({ paletteOpen }),
  setNotificationsOpen: (notificationsOpen) => set({ notificationsOpen }),
}));
