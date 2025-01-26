import { create } from "zustand";
import { MessageStore } from "@/types/messageStore";

interface MessageStoreState {
  messageStores: MessageStore[];
  setMessageStores: (messageStoreList: MessageStore[]) => void;
}

export const useMessageStore = create<MessageStoreState>((set) => ({
  messageStores: [],
  setMessageStores: (messageStores) => {
    set({ messageStores });
  },
}));

export const selectMessageStores = (state: MessageStoreState) =>
  state.messageStores;
