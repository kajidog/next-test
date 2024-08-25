export interface Bot {
  id: string;
  name: string;
  avatar: string | null;
  guilds: {
    [guildId: Guild["id"]]: Guild;
  };
}

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
