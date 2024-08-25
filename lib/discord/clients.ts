import { Client, GatewayIntentBits } from "discord.js";

// Discordクライアントのインスタンスをトークンごとに管理
export const clients: { [token: string]: Client<boolean> } = {};

// ボットのログイン状態を追跡
export let isLoggedIn: { [token: string]: boolean } = {};

export const startBotClient = async (accessToken: string) => {
  if (!clients[accessToken]) {
    const client = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    });
    clients[accessToken] = client;
  }
  const client = clients[accessToken];

  if (!isLoggedIn[accessToken]) {
    try {
      await client.login(accessToken);
      isLoggedIn[accessToken] = true;
      console.log("Discord bot logged in");
    } catch (error) {
      throw error;
    }
  }
  return client;
};
