import { Edge, Node } from "@xyflow/react";
import { useEffect } from "react";
import { fetchBots } from "@/api/bot";
import { useMutation } from "@/hooks/useMutation";
import { useDiscordBotStore } from "../stores/discordBotStore";
import { parseBotResponse } from "../utils/botsParse";

export interface useBot {
  isLoad?: boolean;
}

export const useDiscordBot = (options?: useBot) => {
  const { setDiscordBots, discordBots, selectedBotId, setSelectedBotId } =
    useDiscordBotStore();

  // ボット一覧取得API
  const mutation = useMutation({
    mutationFn: fetchBots(),
    onSuccess: (data) => {
      if (data?.bots) {
        const bots = parseBotResponse(data.bots);
        setDiscordBots(bots);
        return bots;
      }
      setDiscordBots([]);
      return [];
    },
  });

  // ロード時にボット一覧を取得
  useEffect(() => {
    if (options?.isLoad) {
      mutation.mutate();
    }
  }, []);

  const handleSavaFlow = (_nodes: Node[], _edges: Edge[]) => {};
  return {
    discordBots,
    selectedBotId,
    setSelectedBotId,
    mutation,
    setDiscordBots,
    handleSavaFlow,
  };
};
