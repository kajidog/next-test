import { Bot, BotWithOptionalId } from "@/types/bot";
import { createApiClient, get, post } from ".";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { Edge, Node } from "@xyflow/react";

/**
 * サーバからボット一覧を取得
 */
export interface BotsResponse {
  bots: Bot[];
}
export const fetchBots = () => {
  const client = createApiClient();
  const url = API_ENDPOINTS.BOT.LIST;
  return () => get<BotsResponse>(client, url);
};

/**
 * ボット作成API
 */
interface addBptResponse {
  error: boolean;
  bots?: Bot[];
}
export const addBot = () => {
  const client = createApiClient();
  const url = API_ENDPOINTS.BOT.BOT;
  return (bot: { name: string }) =>
    post<addBptResponse>(client, url, {
      bot,
    });
};

/**
 *  ボットのフロー取得
 * @param name
 * @returns
 */

export const fetchBotFlow = (name: Bot["name"]) => {
  const client = createApiClient();
  const url = API_ENDPOINTS.BOT.FLOW.INDEX(name);
  return () =>
    get<{
      error: string;
      edges: Edge[];
      nodes: Node[];
    }>(client, url);
};

/**
 *  ボットのフロー保存
 */
export const saveBotFlow = () => {
  const client = createApiClient();
  return (body: { name: Bot["name"]; edges: Edge[]; nodes: Node[] }) => {
    const url = API_ENDPOINTS.BOT.FLOW.INDEX(body.name);
    return post<{
      error: boolean;
    }>(client, url, { ...body });
  };
};

/**
 * A collection of API methods related to bots.
 */
export const botApi = {
  fetchBots,
  addBot,
  fetchBotFlow,
  saveBotFlow,
};
