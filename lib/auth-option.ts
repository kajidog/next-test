import { AuthError, NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import { ZodError } from "zod";
import { loginFormSchema } from "@/features/auth/utils/loginFormSchema";
import { saltAndHashPassword } from "@/utils/password";

export const authOption: NextAuthConfig = {
  providers: [
    GitHub,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      name: "Credentials",

      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          let user = null;

          const { password } = await loginFormSchema.parseAsync(credentials);

          // logic to salt and hash password
          saltAndHashPassword(password);

          // logic to verify if user exists
          user = {
            id: "1",
            name: "J Smith",
            email: "jsmith@example.com",
            role: "admin",
            image:
              "https://cdn.discordapp.com/avatars/1155131358730014750/55217fd3503062593748553aeed8339a",
            backendToken: "backEndAccessToken",
            redirectTo: "/dashboard",
          };

          if (!user) {
            throw new Error("User not found.");
          }

          // return json object with the user data
          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            throw new AuthError(error.errors[0].message);
          } else {
            return null;
          }
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },
  basePath: "/api/auth",
  secret: process.env.AUTH_SECRET,
};
