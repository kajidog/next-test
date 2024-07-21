"use client";

import { useRouter } from "next/navigation";
import { serverAction, serverGithubAction } from "../utils/authUtils";
export function LoginForm() {
  const router = useRouter();
  const handleSubmit = async (formData: FormData) => {
    try {
      const result = await serverAction(formData);
      if (result.success) {
        router.push("/dashboard");
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form action={handleSubmit}>
        <label>
          Email
          <input name="email" type="email" />
        </label>
        <label>
          Password
          <input name="password" type="password" />
        </label>
        <button type="submit">Sign In</button>
      </form>

      <form action={serverGithubAction}>
        <button type="submit">Signin with GitHub</button>
      </form>
    </>
  );
}
