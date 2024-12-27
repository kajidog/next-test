"use client";
import { serverGithubAction } from "../utils/authUtils";
import { Alert, Card, CardContent, CardHeader } from "@mui/material";

import { useFormState, useFormStatus } from "react-dom";
import { serverSignIn, State } from "../utils/authUtils";

export function LoginForm() {
  const initialState: State = { error: "" };
  const { pending } = useFormStatus();
  const [state, dispatch] = useFormState(serverSignIn, initialState);

  return (
    <>
      <Card className="w-full max-w-md">
        <CardContent>
          <form action={dispatch} className="space-y-4">
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
                autoComplete="email"
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
                autoComplete="current-password"
                placeholder="********"
              />
            </div>
            {state.error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {state.error}
              </Alert>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
              disabled={pending}
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
