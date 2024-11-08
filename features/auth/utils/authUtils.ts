"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function serverGithubAction() {
  "use server";
  return await signIn("github", { redirectTo: "/dashboard" });
}

export async function serverAction(formData: FormData) {
  "use server";

  try {
    const result = await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: result.error };
    } else {
      return { success: true };
    }
  } catch (error) {
    console.error("Server action error:", error);
    if (error instanceof AuthError) {
      return {
        success: false,
        error: error?.message,
      };
    } else {
      return {
        success: false,
        error: "An unexpected error occurred",
      };
    }
  }
}
