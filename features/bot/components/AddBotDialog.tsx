import React, { ReactNode } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useDialog } from "@/hooks/useDialog";
import { useAddBot } from "../hooks/useAddBot";
import { Bot } from "@/types/bot";
import LoadingButton from "@mui/lab/LoadingButton";

export interface AddBotDialog {
  isOpen?: boolean;
  children: ReactNode;
  onSubmit?: (bots: Bot[]) => void;
}

export const AddBotDialog: React.FC<AddBotDialog> = (props) => {
  const { isOpen, close, open } = useDialog({
    isOpen: props.isOpen,
  });
  const { handleAddBot, mutation } = useAddBot({
    // 作成成功時の処理
    onSuccess: (bots) => {
      close();
      props.onSubmit && props.onSubmit(bots);
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

  return (
    <>
      {/* 作成ボタンを開くボタン */}
      <div onClick={open}>{props.children}</div>

      {/* 作成ダイアログ */}
      <Dialog
        open={isOpen}
        onClose={close}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmitAddBotDialog,
        }}
      >
        <DialogTitle>ボット新規登録</DialogTitle>
        <DialogContent>
          <DialogContentText>
            DiscordボットのBotTokenを入力してください。
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="BotToken"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>キャンセル</Button>
          <LoadingButton
            disabled={mutation.isPending}
            loading={mutation.isPending}
            type="submit"
          >
            登録
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddBotDialog;
