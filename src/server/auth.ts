import type { NextAuthConfig } from "next-auth";
import { UpstashRedisAdapter } from "@auth/upstash-redis-adapter"
import db from "./db/db";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import NextAuth from "next-auth";

export const authConfig = {
  adapter: UpstashRedisAdapter(db),
  pages: {
    signIn: '/login',
  },
  providers: [
    GoogleProvider,
    GithubProvider
  ],
} satisfies NextAuthConfig;

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig)