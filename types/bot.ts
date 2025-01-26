export type BotWithOptionalId = Omit<Bot, "id"> & { id?: string };

export interface Guild {
  name: string;
  id: string;
  icon: string | null;
  channels: {
    [channelId: Channel["id"]]: Channel;
  };
}

export interface Channel {
  id: string;
  name: string;
}

export interface BaseBot {
  id: string;
  name: string;
}

export interface DiscordBot extends BaseBot {
  type: "discord";
  name: string;
  avatar: string | null;
  guilds: {
    [guildId: Guild["id"]]: Guild;
  };
}

export interface DifyBot extends BaseBot {
  type: "dify";
  token?: string;
  url?: string;
}

export type Bot = DiscordBot | DifyBot;
