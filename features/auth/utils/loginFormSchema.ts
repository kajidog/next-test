import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email("有効なメールアドレスを入力してください"),
  password: z.string().min(8, "パスワードは8文字以上である必要があります"),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

export const validateLoginForm = (data: LoginFormData) => {
  return loginFormSchema.safeParse(data);
};
