// src/api/index.ts

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { useAuthStore } from "@/features/auth/stores/authStore";
// API のベース URL
const BASE_URL = "/api";

// カスタム エラー クラス
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// API クライアントの作成
export const createApiClient = (): AxiosInstance => {
  const token = useAuthStore.getState().token;
  const client = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
  return client;
};

const rejectApiError = (error: any) => {
  if (error.response) {
    return Promise.reject(
      new ApiError(error.response.status, error.response.data.message)
    );
  }
  return Promise.reject(error);
};

// 汎用的な API 関数
export const get = <T>(
  client: AxiosInstance,
  url: string,
  config?: AxiosRequestConfig
): Promise<T> =>
  client
    .get(url, config)
    .then((response: AxiosResponse<T>) => response.data)
    .catch(rejectApiError);

export const post = <T>(
  client: AxiosInstance,
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> =>
  client
    .post(url, data, config)
    .then((response: AxiosResponse<T>) => response.data)
    .catch(rejectApiError);

export const put = <T>(
  client: AxiosInstance,
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> =>
  client
    .put(url, data, config)
    .then((response: AxiosResponse<T>) => response.data)
    .catch(rejectApiError);

export const del = <T>(
  client: AxiosInstance,
  url: string,
  config?: AxiosRequestConfig
): Promise<T> =>
  client
    .delete(url, config)
    .then((response: AxiosResponse<T>) => response.data)
    .catch(rejectApiError);

// 型定義
export type ApiResponse<T> = Promise<T>;
