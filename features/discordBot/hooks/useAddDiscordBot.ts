import { addBot } from "@/api/bot";
import { useMutation } from "@/hooks/useMutation";
import { Bot } from "@/types/bot";
import { parseBotResponse } from "../utils/botsParse";

export interface useAddDiscordBot {
  onSuccess?: (bots: Bot[]) => void;
}

export const useAddDiscordBot = (options: useAddDiscordBot | undefined) => {
  // ボット作成API
  const mutation = useMutation({
    mutationFn: addBot(),
    onSuccess: (data) => {
      if (options?.onSuccess) {
        const bots = parseBotResponse(data?.bots || []);
        options.onSuccess(bots);
      }
      return data?.bots ?? [];
    },
  });

  // ボット作成処理
  const handleAddBot = async (bot: { name: string }) => {
    await mutation.mutateAsync(bot);
  };

  return {
    handleAddBot,
    mutation,
  };
};
