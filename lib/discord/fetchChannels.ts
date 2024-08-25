import { Channel } from "@/types/bot";
import { clients, startBotClient } from "./clients";

export default async function fetchChannels(
  accessToken: string,
  guildId: string
) {
  // ボットがまだログインしていない場合はログイン
  try {
    await startBotClient(accessToken);
  } catch (error) {
    console.error("Failed to log in Discord bot:", error);
    return {};
  }

  try {
    const client = clients[accessToken];
    const guild = await client.guilds.fetch(guildId);
    const channels: { [channelId: Channel["id"]]: Channel } = {};
    guild.channels.cache.forEach((channel) => {
      channels[channel.id] = {
        id: channel.id,
        name: channel.name,
      };
    });
    return channels;
  } catch (error) {
    console.error("Error fetching guilds:", error);
    throw error;
  }
}
