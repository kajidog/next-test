import { fetchBotFlow } from "@/api/bot";
import { useMutation } from "@tanstack/react-query";
import { useDiscordBotStore } from "../stores/discordBotStore";
import { useEffect } from "react";
import { DiscordBot } from "@/types/bot";

export const useBotFlowValues = (discordBotId: DiscordBot["id"]) => {
  const mutation = useMutation({
    mutationFn: fetchBotFlow(discordBotId),
    onSuccess: (data) => {
      if (data.error) {
        alert("読み込み失敗");
        return {
          data: {
            edges: [],
            nodes: [],
          },
        };
      }
      return data;
    },
  });

  useEffect(() => {
    mutation.mutate();
  }, []);

  return {
    mutation,
  };
};
