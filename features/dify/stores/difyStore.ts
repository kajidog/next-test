import { Dify } from "@/types/dify";
import { create } from "zustand";

interface DifyState {
  difyList: Dify[];
  selectedDifyId: Dify["id"] | null;
  setSelectedDifyId: (nextId: Dify["id"]) => void;
  setDifyList: (difyList: Dify[]) => void;
}

export const useDifyStore = create<DifyState>((set) => ({
  difyList: [],
  selectedDifyId: null,
  setSelectedDifyId: (next) => {
    set({
      selectedDifyId: next,
    });
  },
  setDifyList: (difyList) => {
    set({
      difyList,
    });
  },
}));

export const selectDifyList = (state: DifyState) => state.difyList;
