import { createApiClient, get, post } from ".";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { Edge, Node } from "@xyflow/react";

interface ApiChannel {
  id: string;
  name: string;
}

interface ApiGuild {
  name: string;
  id: string;
  icon: string | null;
  channels: ApiChannel[];
}

export interface ApiBot {
  id: string;
  name: string;
  avatar: string | null;
  guilds: ApiGuild[];
}

/**
 * サーバからボット一覧を取得
 */
export interface BotsResponse {
  bots: ApiBot[];
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
  bots?: ApiBot[];
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

export const fetchBotFlow = (name: ApiBot["name"]) => {
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
  return (body: { name: ApiBot["name"]; edges: Edge[]; nodes: Node[] }) => {
    const url = API_ENDPOINTS.BOT.FLOW.INDEX(body.name);
    return post<{
      error: boolean;
    }>(client, url, {
      ...body,
      nodes: body.nodes.map((node) => ({ ...node, measured: [] })),
    });
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
