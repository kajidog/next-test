import LoadingButton from "@mui/lab/LoadingButton";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { ReactNode } from "react";
import { useAddBotDialog } from "../hooks/useAddBotDialog";

export interface AddBotDialogProps {
  isOpen?: boolean;
  children: ReactNode;
  onSubmit?: () => void;
}

export const AddBotDialog: React.FC<AddBotDialogProps> = (props) => {
  const { dialogState, mutation, handleSubmitAddBotDialog } = useAddBotDialog({
    isOpen: props.isOpen,
    onSubmit: props.onSubmit,
  });

  return (
    <>
      {/* 作成ボタンを開くボタン */}
      <div onClick={dialogState.open}>{props.children}</div>

      {/* 作成ダイアログ */}
      <Dialog
        open={dialogState.isOpen}
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
