export const BASE_URL = "/api";
export const BOT_MANAGEMENT_SERVICE_BASE_URL =
  process.env.BOT_MANAGEMENT_SERVICE_BASE_URL ?? "http://localhost:8080";
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `/auth/login`,
    LOGOUT: `/auth/logout`,
    REGISTER: `/auth/register`,
    REFRESH_TOKEN: `/auth/refresh-token`,
  },
  USER: {
    PROFILE: `/user/profile`,
    UPDATE_PROFILE: `/user/update-profile`,
  },
  BOT: {
    LIST: `/bot/list`,
    BOT: `/bot`,
    FLOW: {
      INDEX: (name: string) => `/bot/flow/${name}`,
    },
  },
  DIFY: {
    LIST: `/dify/list`,
    INDEX: `/dify`,
  },
  MESSAGE_STORE: {
    LIST: `/message-store/list`,
    INDEX: `/message-store`,
  },
};
