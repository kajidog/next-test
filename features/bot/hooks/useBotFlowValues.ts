import { fetchBotFlow } from "@/api/bot";
import { useMutation } from "@tanstack/react-query";
import { useBotStore } from "../stores/botStore";
import { useEffect } from "react";

export const useBotFlowValues = () => {
  const { selectedBotId } = useBotStore();

  const mutation = useMutation({
    mutationFn: fetchBotFlow(selectedBotId!),
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
    if (selectedBotId) {
      mutation.mutate();
    }
  }, [selectedBotId]);

  return {
    mutation,
  };
};
