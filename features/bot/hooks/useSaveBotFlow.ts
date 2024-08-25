import { saveBotFlow } from "@/api/bot";
import { useMutation } from "@tanstack/react-query";
import { useBotStore } from "../stores/botStore";
import { Edge, Node } from "@xyflow/react";
import { Bot } from "@/types/bot";

export interface useSaveBotFlow {
  selectedBotId?: Bot["name"];
}
export const useSaveBotFlow = (options?: useSaveBotFlow) => {
  const { selectedBotId } = useBotStore();
  const mutation = useMutation({
    mutationFn: saveBotFlow(),
  });

  const handleSaveBotFlow = async (
    nodes: Node[],
    edges: Edge[],
    name: string | undefined = selectedBotId!
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
