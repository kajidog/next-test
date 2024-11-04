import { Dify, DifyWithOptionalId } from "@/types/dify";
import { createApiClient, get, post } from ".";
import { API_ENDPOINTS } from "@/constants/api-endpoints";

/**
 * サーバからDify一覧を取得
 */
export const fetchDifyList = () => {
  const client = createApiClient();
  const url = API_ENDPOINTS.DIFY.LIST;
  return () =>
    get<{
      difyList: Dify[];
    }>(client, url);
};

/**
 * Dify作成API
 */
export const addDify = () => {
  const client = createApiClient();
  const url = API_ENDPOINTS.DIFY.INDEX;
  return (body: {
    name: string;
    url: string;
    token: string;
    color: string;
  }) => {
    return post<{
      error: boolean;
      difyList?: Dify[];
    }>(client, url, body);
  };
};

/**
 * A collection of API methods related to dify.
 */
export const difyApi = {
  fetchDifyList,
  addDify,
};
