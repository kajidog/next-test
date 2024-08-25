import { fetchBots, addBot } from "@/api/bot";
import { useBotStore } from "../stores/botStore";
import { useMutation } from "@/hooks/useMutation";
import { useEffect } from "react";
import { Edge, Node } from "@xyflow/react";

export interface useBot {
  isLoad?: boolean;
}

export const useBot = (options?: useBot) => {
  const { setBots, bots, selectedBotId, setSelectedBotId } = useBotStore();

  // ボット一覧取得API
  const mutation = useMutation({
    mutationFn: fetchBots(),
    onSuccess: (data) => {
      if (data?.bots) {
        setBots(data.bots);
        return data.bots;
      }
      setBots([]);
      return [];
    },
  });

  // ロード時にボット一覧を取得
  useEffect(() => {
    if (options?.isLoad) {
      mutation.mutate();
    }
  }, []);

  const handleSavaFlow = (nodes: Node[], edges: Edge[]) => {};
  return {
    bots,
    selectedBotId,
    setSelectedBotId,
    mutation,
    setBots,
    handleSavaFlow,
  };
};
