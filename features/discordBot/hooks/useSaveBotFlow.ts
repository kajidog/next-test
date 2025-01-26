import { saveBotFlow } from "@/api/bot";
import { useMutation } from "@tanstack/react-query";
import { useDiscordBotStore } from "../stores/discordBotStore";
import { Edge, Node } from "@xyflow/react";
import { DiscordBot } from "@/types/bot";

export interface useSaveBotFlow {
  selectedBotId?: DiscordBot["name"];
}
/**
 * discord botのフローを保存
 * @param options
 * @returns
 */
export const useSaveBotFlow = (options?: useSaveBotFlow) => {
  const mutation = useMutation({
    mutationFn: saveBotFlow(),
  });

  const handleSaveBotFlow = async (
    nodes: Node[],
    edges: Edge[],
    name: string
  ) => {
    await mutation.mutateAsync({
      edges,
      nodes,
      name,
    });
  };
  return {
    mutation,
    handleSaveBotFlow,
  };
};
