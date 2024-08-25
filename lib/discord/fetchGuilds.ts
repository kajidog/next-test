import { Guild } from "@/types/bot";
import { clients, startBotClient } from "./clients";
import fetchChannels from "./fetchChannels";

export const guilds: {
  [token: string]: {
    [guildId: Guild["id"]]: Guild;
  };
} = {};

export default async function fetchGuilds(accessToken: string) {
  // ボットがまだログインしていない場合はログイン
  try {
    await startBotClient(accessToken);
  } catch (error) {
    console.error("Failed to log in Discord bot:", error);
    throw error;
  }

  if (guilds[accessToken]) {
    return guilds[accessToken];
  }
  if (guilds[accessToken] === undefined) {
    guilds[accessToken] = {};
  }
  try {
    const client = clients[accessToken];
    for (const guild of client.guilds.cache.map((v) => v)) {
      const channels = await fetchChannels(accessToken, guild.id);
      guilds[accessToken][guild.id] = {
        id: guild.id,
        icon: guild.iconURL(),
        name: guild.name,
        channels,
      };
    }
    client.guilds.cache.forEach((guild) => {
      return {
        id: guild.id,
        icon: guild.iconURL(),
        name: guild.name,
      };
    });
    return guilds[accessToken];
  } catch (error) {
    console.error("Error fetching guilds:", error);
    throw error;
  }
}
