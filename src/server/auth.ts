import type { NextAuthConfig } from "next-auth";
import { UpstashRedisAdapter } from "@auth/upstash-redis-adapter"
import db from "./db/db";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";

export const authConfig = {
  adapter: UpstashRedisAdapter(db),
  pages: {
    signIn: '/login',
  },
  providers: [GoogleProvider],
} satisfies NextAuthConfig;

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig)