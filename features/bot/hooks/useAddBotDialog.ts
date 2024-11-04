import { useDialog } from "@/hooks/useDialog";
import { Bot } from "@/types/bot";
import { useAddBot } from "./useAddBot";

export interface useAddBotDialog {
  onSubmit?: (bots: Bot[]) => void;
  isOpen?: boolean;
}

export const useAddBotDialog = (options?: useAddBotDialog) => {
  const dialogState = useDialog({
    isOpen: options?.isOpen,
  });
  const { handleAddBot, mutation } = useAddBot({
    // 作成成功時の処理
    onSuccess: (bots) => {
      close();
      options?.onSubmit && options.onSubmit(bots);
    },
  });

  // OKを押したときの処理
  const handleSubmitAddBotDialog = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    if (formJson.name) {
      handleAddBot({
        name: formJson.name as string,
      });
    }
  };

  return {
    dialogState,
    mutation,
    handleSubmitAddBotDialog,
  };
};
