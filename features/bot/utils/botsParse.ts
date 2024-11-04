import { ApiBot } from "@/api/bot";
import { Bot, Guild } from "@/types/bot";

export const parseBotResponse = (bots: ApiBot[]): Bot[] => {
  const _bots: Bot[] = [];

  bots.forEach((apiBot) => {
    let guilds: Bot["guilds"] = {};
    apiBot.guilds.forEach((apiGuild) => {
      let channels: Guild["channels"] = {};
      // チャンネルの配列をチャンネルIDでインデックス化
      apiGuild.channels.forEach((apiChannel) => {
        channels[apiChannel.id] = apiChannel;
      });

      // ギルドの配列をギルドIDでインデックス化
      // チャンネルはインデックス化したオブジェクトに置き換え
      guilds[apiGuild.id] = {
        ...apiGuild,
        channels,
      };
    });

    // インデックス化したギルドに置き換え
    _bots.push({
      ...apiBot,
      guilds,
    });
  });

  return _bots;
};
