"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export async function serverGithubAction() {
  "use server";
  return await signIn("github", { redirectTo: "/dashboard" });
}

export type State = {
  error?: string;
  success?: boolean;
};

export async function serverSignIn(
  prevState: State,
  formData: FormData,
): Promise<State> {
  "use server";

  const result = await signIn("credentials", {
    ...Object.fromEntries(formData),
    redirect: false,
  }).catch((error) => {
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
  });

  if (result?.error) {
    return { success: false, error: result.error };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
