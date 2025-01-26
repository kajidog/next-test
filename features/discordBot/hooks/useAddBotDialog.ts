import React from "react";
import { useDialog } from "@/hooks/useDialog";
import { useAddDiscordBot } from "./useAddDiscordBot";

export interface AddBotDialogOptions {
  onSubmit?: () => void;
  isOpen?: boolean;
}

export const useAddBotDialog = (options?: AddBotDialogOptions) => {
  const dialogState = useDialog({
    isOpen: options?.isOpen,
  });
  const { handleAddBot, mutation } = useAddDiscordBot({
    // 作成成功時の処理
    onSuccess: () => {
      close();
      options?.onSubmit && options.onSubmit();
    },
  });

  // OKを押したときの処理
  const handleSubmitAddBotDialog = (
    event: React.FormEvent<HTMLFormElement>,
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
