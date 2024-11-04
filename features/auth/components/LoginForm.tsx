"use client";

import { useRouter } from "next/navigation";
import { serverAction, serverGithubAction } from "../utils/authUtils";
import { Alert, Card, CardContent, CardHeader } from "@mui/material";
import { useState } from "react";
export function LoginForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (formData: FormData) => {
    try {
      setLoading(true);
      const result = await serverAction(formData);

      if (result.success) {
        router.push("/dashboard");
      } else {
        setErrorMessage(result.error ?? null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="w-full max-w-md">
        <CardHeader>
          <h2 className="text-2xl font-bold text-center">ログイン</h2>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                メールアドレス
              </label>
              <input
                id="email"
                type="email"
                name="email"
                className={`w-full p-2 border rounded-md border-gray-300`}
                placeholder="example@example.com"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="password"
              >
                パスワード
              </label>
              <input
                id="password"
                type="password"
                name="password"
                className={`w-full p-2 border rounded-md border-gray-300`}
                placeholder="********"
              />
            </div>
            {errorMessage && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {errorMessage}
              </Alert>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
              disabled={loading}
            >
              ログイン
            </button>
          </form>
        </CardContent>
      </Card>
      <form action={serverGithubAction}>
        <button type="submit">Signin with GitHub</button>
      </form>
    </>
  );
}
