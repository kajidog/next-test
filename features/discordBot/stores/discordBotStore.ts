import { DiscordBot } from "@/types/bot";
import { create } from "zustand";

interface BotState {
  discordBots: DiscordBot[];
  selectedBotId: DiscordBot["id"] | null;
  setSelectedBotId: (nextId: DiscordBot["id"]) => void;
  setDiscordBots: (bots: DiscordBot[]) => void;
}

export const useDiscordBotStore = create<BotState>((set) => ({
  discordBots: [],
  selectedBotId: null,
  setSelectedBotId: (next) => {
    set({
      selectedBotId: next,
    });
  },
  setDiscordBots: (discordBots) => {
    set({
      discordBots,
    });
  },
}));

export const selectDiscordBots = (state: BotState) => state.discordBots;
export const selectSelectedBotId = (state: BotState) => state.setSelectedBotId;
