import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    signOut: "/",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnCourse = nextUrl.pathname.startsWith("/course");
      const isOnProfile = nextUrl.pathname.startsWith("/profile");
      const isOnCertificates = nextUrl.pathname.startsWith("/certificates");

      if (isOnCourse || isOnProfile || isOnCertificates) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL("/auth/login", nextUrl.origin));
      }

      if (isLoggedIn && (nextUrl.pathname.startsWith("/auth/login") || nextUrl.pathname.startsWith("/auth/register"))) {
        return Response.redirect(new URL("/course", nextUrl.origin));
      }

      return true;
    },
  },
  providers: [], // заполняем в auth.ts
};
