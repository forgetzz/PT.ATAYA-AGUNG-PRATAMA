// src/store/tabStore.ts
import { create } from "zustand";

type TabKey = "home" | "jaringan" | "finance" | "produk" | "settings" | "OrderPIN" | "StockPIN" | "aktivasiRO" | "TransferPin" | "Withdraw" |"TotalBonus" | "ManajemenBonus" | "RewardPeringkat" | "RewardUtama" | "DaftarReseller" | "InputReseller" | "RiwayatReseller" | "RiwayatRoPribadi" | "RewardReseller" | "Rincian" | "RiwayatRO";

interface TabStore {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
}

export const useTabStore = create<TabStore>((set) => ({
  activeTab: "home",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));

export type MenuLink = 'ManajemenBonus' | 'ManajemenPin' | 'ManajemenReward'

interface ActiveKeyState {
  activeNested: MenuLink
  setActiveList: (list: MenuLink) => void
}

export const useActiveList = create<ActiveKeyState>((set) => ({
  activeNested: 'ManajemenBonus',
  setActiveList: (tab) => set({ activeNested: tab }),
}))