// src/api/auth.ts

import { User } from "@/types/user";
import { post, ApiResponse, createApiClient } from "./index";
import { API_ENDPOINTS } from "@/constants/api-endpoints";

// 型定義
export interface LoginCredentials {
  email: User["email"];
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const loginApi = (
  credentials: LoginCredentials
): ApiResponse<AuthResponse> => {
  const client = createApiClient();
  return post(client, API_ENDPOINTS.AUTH.LOGIN, credentials);
};

export const authAPI = {
  login: loginApi,
};
