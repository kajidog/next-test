import NextAuth from "next-auth";
import { authOption } from "@/lib/auth-option";

export const { handlers, signIn, signOut, auth } = NextAuth(authOption);
