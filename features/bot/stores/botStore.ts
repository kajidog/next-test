import { Bot } from "@/types/bot";
import { create } from "zustand";

interface BotState {
  bots: Bot[];
  selectedBotId: Bot["id"] | null;
  setSelectedBotId: (nextId: Bot["id"]) => void;
  setBots: (bots: Bot[]) => void;
}

export const useBotStore = create<BotState>((set) => ({
  bots: [],
  selectedBotId: null,
  setSelectedBotId: (next) => {
    set({
      selectedBotId: next,
    });
  },
  setBots: (bots) => {
    set({
      bots,
    });
  },
}));

export const selectBots = (state: BotState) => state.bots;
export const selectSelectedBotId = (state: BotState) => state.setSelectedBotId;
