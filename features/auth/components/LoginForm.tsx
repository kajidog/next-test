import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export function LoginForm() {
  return (
    <>
      <form
        action={async (formData) => {
          "use server";
          try {
            const result = await signIn("credentials", {
              ...Object.fromEntries(formData),
              redirect: false,
            });
            if (result?.error) {
              // エラー処理
            } else {
              redirect("/dashboard");
            }
          } catch (error) {
            // エラー処理
          }
        }}
      >
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

      <form
        action={async () => {
          "use server";
          await signIn("github", { redirectTo: "/dashboard" });
        }}
      >
        <button type="submit">Signin with GitHub</button>
      </form>
    </>
  );
}
