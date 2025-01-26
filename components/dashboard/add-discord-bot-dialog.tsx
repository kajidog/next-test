"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { DiscordBot } from "@/types/bot";
import { useAddDiscordBot } from "@/features/discordBot/hooks/useAddDiscordBot";
import { LoadingButton } from "@mui/lab";

interface AddDiscordBotDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bot: DiscordBot | null;
}

export function AddDiscordBotDialog({
  open,
  onOpenChange,
  bot,
}: AddDiscordBotDialogProps) {
  const [token, setToken] = useState("");

  const { handleAddBot, mutation } = useAddDiscordBot({
    // 作成成功時の処理
    onSuccess: () => {
      onOpenChange(false);
    },
  });

  const handleSubmitAddBotDialog = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddBot({
      name: token,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={() => onOpenChange(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>{bot ? "Edit Discord Bot" : "Add Discord Bot"}</DialogTitle>
      <form onSubmit={handleSubmitAddBotDialog}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="url"
            label="Bot Token"
            type="text"
            fullWidth
            variant="outlined"
            value={token}
            name="token"
            onChange={(e) => setToken(e.target.value)}
            placeholder=""
          />
          {mutation.isError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Server Error
            </Alert>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => onOpenChange(false)}>Cancel</Button>
          <LoadingButton
            loading={mutation.isPending}
            disabled={mutation.isPending}
            type="submit"
            variant="contained"
          >
            {bot ? "Save Changes" : "Add Bot"}
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}
