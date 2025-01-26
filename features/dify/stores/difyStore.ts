import { DifyBot } from "@/types/bot";
import { Dify } from "@/types/dify";
import { create } from "zustand";

interface DifyState {
  difyList: DifyBot[];
  selectedDifyId: DifyBot["id"] | null;
  setSelectedDifyId: (nextId: DifyBot["id"]) => void;
  setDifyList: (difyList: DifyBot[]) => void;
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
