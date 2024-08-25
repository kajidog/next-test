import { addBot } from "@/api/bot";
import { useMutation } from "@/hooks/useMutation";
import { Bot, BotWithOptionalId } from "@/types/bot";

export interface useAddBot {
  onSuccess?: (bots: Bot[]) => void;
}

export const useAddBot = (options: useAddBot | undefined) => {
  // ボット作成API
  const mutation = useMutation({
    mutationFn: addBot(),
    onSuccess: (data) => {
      if (options?.onSuccess) {
        options.onSuccess(data?.bots ?? []);
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
