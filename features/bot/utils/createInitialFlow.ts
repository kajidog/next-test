import { Bot } from "@/types/bot";

export const createInitialFlow = (bot: Bot) => {
  let oneIndex = 0;
  let secondIndex = 0;
  let thirdIndex = 0;
  const nodes: any[] = [];
  const edges: any[] = [];
  oneIndex++;
  nodes.push({
    id: bot.id,
    type: "start",
    data: { label: bot.name },
    position: { x: 0, y: 150 * oneIndex },
  });
  Object.keys(bot.guilds).forEach((guildId) => {
    secondIndex++;
    const guild = bot.guilds[guildId];
    nodes.push({
      id: guild.id,
      type: "server",
      data: { label: guild.name },
      position: {
        x: 450,
        y: 150 * secondIndex,
      },
    });
    edges.push({
      id: `e${bot.id}-${guildId}`,
      source: bot.id,
      target: guildId,
      deletable: true,
    });
    Object.keys(guild.channels).forEach((channelId) => {
      secondIndex++;

      thirdIndex++;
      const channel = guild.channels[channelId];
      nodes.push({
        id: channel.id,
        type: "channel",
        data: { label: channel.name },
        position: {
          x: 900,
          y: 150 * thirdIndex,
        },
      });
      edges.push({
        id: `e${guildId}-${channelId}`,
        source: guildId,
        target: channelId,
        deletable: true,
      });
    });
    secondIndex -= 1;
  });
  return { nodes, edges };
};
