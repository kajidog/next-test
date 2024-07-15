import { useMutation } from "@tanstack/react-query";
import { LoginFormData } from "../utils/loginFormSchema";
import { useAuthStore } from "../stores/authStore";
import { authAPI } from "api/auth";

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);

  return useMutation<LoginResponse, Error, LoginFormData>({
    mutationFn: (credentials) => authAPI.login(credentials),
    onSuccess: (data) => {
      setUser(data.user);
      setToken(data.token);
    },
    onError: (error) => {
      // エラーハンドリング
      console.error("Login error:", error);
    },
  });
};
