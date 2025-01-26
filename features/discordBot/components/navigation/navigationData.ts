"use client";

import { useDiscordBot } from "../../hooks/useDiscordBot";
import { useMessageStore } from "@/features/messageStore/hooks/useMessageStore";
import { useDify } from "@/features/dify/hooks/useDify";
import { useMemo } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
interface NavigationItem {
  id: string;
  name: string;
}

interface NavigationSection {
  id: string;
  title: string;
  items: NavigationItem[];
}

export const useNavigationData = () => {
  const params = useParams();

  const { discordBots } = useDiscordBot({
    isLoad: true,
  });

  const discordBotInfo = useMemo(() => {
    if (!params.botId) {
      return null;
    }

    for (const bot of discordBots) {
      if (bot.name === params.botId) {
        return bot;
      }
    }
    return null;
  }, [discordBots, params.botId]);

  const channels = useMemo(() => {
    if (discordBotInfo === null) {
      return [];
    }

    const list: NavigationItem[] = [];
    Object.keys(discordBotInfo.guilds).forEach((guildId) => {
      Object.keys(discordBotInfo.guilds[guildId].channels).forEach(
        (channelId) => {
          list.push({
            id: discordBotInfo.guilds[guildId].channels[channelId].name,
            name: `${discordBotInfo.guilds[guildId].name} ${discordBotInfo.guilds[guildId].channels[channelId].name}`,
          });
        }
      );
    });

    return list;
  }, [discordBotInfo]);

  const { messageStores } = useMessageStore({
    isLoad: true,
  });
  const { difyList } = useDify({
    isLoad: true,
  });

  return {
    navigationData: [
      {
        id: "channel",
        title: "Discord",
        items: channels,
      },
      {
        id: "dify",
        title: "Dify",
        items: difyList.map((dify) => ({
          name: dify.name,
          id: dify.name,
        })),
      },
      {
        id: "messageSave",
        title: "メッセージストア",
        items: messageStores.map((store) => ({
          id: store.name,
          name: store.name,
        })),
      },
    ] as NavigationSection[],
  };
};
