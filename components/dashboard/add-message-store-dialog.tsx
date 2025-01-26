"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { MessageStore } from "@/types/messageStore";
import { useAddMessageStore } from "@/features/messageStore/hooks/useAddMessageStore";
import { useMessageStore } from "@/features/messageStore/hooks/useMessageStore";
import { LoadingButton } from "@mui/lab";

interface AddMessageStoreDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  messageStore: MessageStore | null;
}

export function AddMessageStoreDialog({
  open,
  onOpenChange,
  messageStore,
}: AddMessageStoreDialogProps) {
  const [name, setName] = useState(messageStore?.name || "");
  const [url, setUrl] = useState(messageStore?.url || "");

  const { mutation } = useMessageStore();
  const { mutation: addMessageStoreMutation } = useAddMessageStore({
    onSuccess: () => {
      mutation.mutateAsync();
      onOpenChange(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMessageStoreMutation.mutate({
      url,
      name,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={() => onOpenChange(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {messageStore ? "Edit Message Store" : "Add Message Store"}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="App Name"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="My Bot"
          />
          <TextField
            margin="dense"
            id="url"
            label="Bot URL"
            type="url"
            fullWidth
            variant="outlined"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://api.messageStore.ai/bot"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onOpenChange(false)}>Cancel</Button>
          <LoadingButton
            loading={addMessageStoreMutation.isPending}
            disabled={addMessageStoreMutation.isPending}
            type="submit"
            variant="contained"
          >
            {messageStore ? "Save Changes" : "Add Message Store"}
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}
