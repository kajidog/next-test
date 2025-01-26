"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { DifyBot } from "@/types/bot";

interface AddDifyBotDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bot: DifyBot | null;
}

export function AddDifyBotDialog({
  open,
  onOpenChange,
  bot,
}: AddDifyBotDialogProps) {
  const [name, setName] = useState(bot?.name || "");
  const [url, setUrl] = useState(bot?.url || "");
  const [token, setToken] = useState(bot?.token || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => onOpenChange(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>{bot ? "Edit Dify Bot" : "Add Dify Bot"}</DialogTitle>
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
            placeholder="https://api.dify.ai/bot"
          />
          <TextField
            margin="dense"
            id="token"
            label="API Token"
            type="password"
            fullWidth
            variant="outlined"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Enter your API token"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button type="submit" variant="contained">
            {bot ? "Save Changes" : "Add Bot"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
