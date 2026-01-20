import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { prisma } from "./lib/prisma";
import type { AdapterUser } from "next-auth/adapters";
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

const verifyPassword = (() => {
  let cached: ((password: string, hash: string) => Promise<boolean>) | null = null;

  return async (password: string, hash: string): Promise<boolean> => {
    if (cached) return cached(password, hash);

    // bcrypt is not available in edge/middleware; try Node import first
    if (typeof window === "undefined") {
      try {
        const bcrypt = await import("bcrypt");
        cached = bcrypt.compare;
        return bcrypt.compare(password, hash);
      } catch (error) {
        console.warn("bcrypt unavailable, falling back to plain comparison:", error);
      }
    }

    cached = async (pwd, hashed) => Promise.resolve(pwd === hashed);
    return password === hash;
  };
})();

type AuthToken = JWT & { id?: string };

export const authOptions = {
  ...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const { email, password } = credentials as { email: string; password: string };

        try {
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user || !user.password) {
            return null;
          }

          const isPasswordValid = await verifyPassword(password, user.password);
          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          };
        } catch (error) {
          console.error("Failed to authorize credentials:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({
      token,
      user,
    }: {
      token: AuthToken;
      user?: User | AdapterUser;
    }) {
      if (user) {
        token.id = (user as AdapterUser).id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: AuthToken }) {
      if (token.id && session.user) {
        (session.user as typeof session.user & { id?: string }).id = token.id;
      }
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
