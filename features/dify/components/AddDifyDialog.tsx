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
import { useAddDify } from "@/features/dify/hooks/useAddDify";
import LoadingButton from "@mui/lab/LoadingButton";
import { Dify } from "@/types/dify";

export interface AddDifyDialog {
  isOpen?: boolean;
  children: ReactNode;
  onSubmit?: (dify: Dify[]) => void;
}

export const AddDifyDialog: React.FC<AddDifyDialog> = (props) => {
  const { isOpen, close, open } = useDialog({
    isOpen: props.isOpen,
  });
  const { handleAddDify, mutation } = useAddDify({
    // APIでDifyの作成成功時の処理
    onSuccess: (dify) => {
      // ダイアログを閉じて親のコールバック関数があれば実行
      close();
      props.onSubmit && props.onSubmit(dify);
    },
  });

  // OKを押したときの処理
  const handleSubmitAddDifyDialog = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    // フォーム情報を取得しAPIを実行
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    handleAddDify({
      name: formJson.name as string,
      url: formJson.url as string,
      token: formJson.token as string,
      color: "#fff",
    });
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
          onSubmit: handleSubmitAddDifyDialog,
        }}
      >
        <DialogTitle>Dify新規登録</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="アプリ名"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="url"
            name="url"
            label="URL"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="token"
            name="token"
            label="token"
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
            作成
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddDifyDialog;
