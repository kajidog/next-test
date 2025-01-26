import { addBot } from "@/api/bot";
import { useMutation } from "@/hooks/useMutation";

export interface useAddDiscordBotOptions {
  onSuccess?: () => void;
}

export const useAddDiscordBot = (
  options: useAddDiscordBotOptions | undefined,
) => {
  // ボット作成API
  const mutation = useMutation({
    mutationFn: addBot(),
    onSuccess: (data) => {
      if (options?.onSuccess) {
        options.onSuccess();
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
