import { create } from "zustand";

type SearchStoreType = {
  isSearchMode: boolean;
  setIsSearchMode: (isSearchMode: boolean) => void;
};

export const searchStore = create<SearchStoreType>((set) => ({
  isSearchMode: false,
  setIsSearchMode: (isSearchMode) => set({ isSearchMode }),
}));
