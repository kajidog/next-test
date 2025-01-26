import { useMutation } from "@tanstack/react-query";
import { Edge, Node } from "@xyflow/react";
import { saveBotFlow } from "@/api/bot";
import { DiscordBot } from "@/types/bot";

export interface useSaveBotFlowOptions {
  selectedBotId?: DiscordBot["name"];
}
/**
 * discord botのフローを保存
 * @param options
 * @returns
 */
export const useSaveBotFlow = (_options?: useSaveBotFlowOptions) => {
  const mutation = useMutation({
    mutationFn: saveBotFlow(),
  });

  const handleSaveBotFlow = async (
    nodes: Node[],
    edges: Edge[],
    name: string,
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
