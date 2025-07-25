// src/store/tabStore.ts
import { create } from "zustand";

type TabKey = "home" | "jaringan" | "finance" | "produk" | "settings";

interface TabStore {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
}

export const useTabStore = create<TabStore>((set) => ({
  activeTab: "home",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
