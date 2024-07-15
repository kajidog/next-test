// src/features/auth/hooks/useLoginForm.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "./useLogin";
import { LoginFormData, loginFormSchema } from "../utils/loginFormSchema";

export const useLoginForm = () => {
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login.mutateAsync(data);
    } catch (error) {
      setError("root", {
        type: "manual",
        message:
          "ログインに失敗しました。メールアドレスとパスワードを確認してください。",
      });
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoading: login.status === "pending",
  };
};
