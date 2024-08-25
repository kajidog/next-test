export const BASE_URL = "/api";
export const MESSAGE_API_BASE_URL = "http://localhost:8080";
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
};
