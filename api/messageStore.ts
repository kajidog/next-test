import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { MessageStore } from "@/types/messageStore";
import { createApiClient, get, post } from ".";

/**
 * メッセージストア一覧を取得
 */
export interface MessageStoresResponse {
  messageStores: MessageStore[];
}
export const fetchMessageStores = () => {
  const client = createApiClient();
  const url = API_ENDPOINTS.MESSAGE_STORE.LIST;
  return () => get<MessageStoresResponse>(client, url);
};

/**
 *  メッセージストア保存
 */
export const upsertMessageStore = () => {
  const client = createApiClient();
  return (body: { url: string; name: string }) => {
    const url = API_ENDPOINTS.MESSAGE_STORE.INDEX;
    return post<{
      error: boolean;
    }>(client, url, { ...body });
  };
};

export const messageStoreApi = {
  fetchMessageStores,
  upsertMessageStore,
};
