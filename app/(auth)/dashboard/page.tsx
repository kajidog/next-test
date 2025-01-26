"use client";

import { useState } from "react";
import {
  Container,
  Card,
  CardContent,
  CardHeader,
  Button,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { BotTable } from "@/components/dashboard/bot-table";
import { AddDiscordBotDialog } from "@/components/dashboard/add-discord-bot-dialog";
import { AddDifyBotDialog } from "@/components/dashboard/add-dify-bot-dialog";
import { Bot, DiscordBot, DifyBot } from "@/types/bot";
import { useDiscordBot } from "@/features/discordBot/hooks/useDiscordBot";
import { useDify } from "@/features/dify/hooks/useDify";
import { useMessageStore } from "@/features/messageStore/hooks/useMessageStore";
import { MessageServiceTable } from "@/components/dashboard/message-table";
import { AddMessageStoreDialog } from "@/components/dashboard/add-message-store-dialog";
import { MessageStore } from "@/types/messageStore";

export default function DashboardPage() {
  const [isDiscordDialogOpen, setIsDiscordDialogOpen] = useState(false);
  const [isDifyDialogOpen, setIsDifyDialogOpen] = useState(false);
  const [isMessageStoreDialogOpen, setIsMessageStoreDialogOpen] =
    useState(false);
  const [editingBot, setEditingBot] = useState<Bot | null>(null);
  const [editionMessageStore, setEditionMessageStore] =
    useState<MessageStore | null>(null);
  const { discordBots } = useDiscordBot({
    isLoad: true,
  });

  const { difyList } = useDify({
    isLoad: true,
  });

  const { messageStores } = useMessageStore({
    isLoad: true,
  });
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Card sx={{ mb: 4 }}>
        <CardHeader
          title="Discordボット"
          action={
            <Button
              variant="contained"
              startIcon={<AddCircleIcon />}
              onClick={() => {
                setEditingBot(null);
                setIsDiscordDialogOpen(true);
              }}
            >
              ボット登録
            </Button>
          }
        />
        <CardContent>
          <BotTable
            bots={discordBots}
            type="discord"
            onEdit={(bot) => {
              setEditingBot(bot);
              setIsDiscordDialogOpen(true);
            }}
          />
        </CardContent>
      </Card>

      <Card sx={{ mb: 4 }}>
        <CardHeader
          title="Difyボット"
          action={
            <Button
              variant="contained"
              startIcon={<AddCircleIcon />}
              onClick={() => {
                setEditingBot(null);
                setIsDifyDialogOpen(true);
              }}
            >
              ボット登録
            </Button>
          }
        />
        <CardContent>
          <BotTable
            bots={difyList}
            type="dify"
            onEdit={(bot) => {
              setEditingBot(bot);
              setIsDifyDialogOpen(true);
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader
          title="メッセージストア"
          action={
            <Button
              variant="contained"
              startIcon={<AddCircleIcon />}
              onClick={() => {
                setEditionMessageStore(null);
                setIsMessageStoreDialogOpen(true);
              }}
            >
              ストア登録
            </Button>
          }
        />
        <CardContent>
          <MessageServiceTable
            messageStores={messageStores}
            onEdit={(messageStore) => {
              setEditionMessageStore(messageStore);
              setIsMessageStoreDialogOpen(true);
            }}
          />
        </CardContent>
      </Card>

      <AddDiscordBotDialog
        open={isDiscordDialogOpen}
        onOpenChange={setIsDiscordDialogOpen}
        bot={editingBot as DiscordBot}
      />

      <AddDifyBotDialog
        open={isDifyDialogOpen}
        onOpenChange={setIsDifyDialogOpen}
        bot={editingBot as DifyBot}
      />

      <AddMessageStoreDialog
        open={isMessageStoreDialogOpen}
        onOpenChange={setIsMessageStoreDialogOpen}
        messageStore={editionMessageStore as MessageStore}
      />
    </Container>
  );
}
