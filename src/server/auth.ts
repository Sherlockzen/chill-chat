import { Lucia, Session, User } from "lucia";
import { LibSQLAdapter } from "@lucia-auth/adapter-sqlite";
import { createClient } from "@libsql/client";
import { databaseUser } from "@/server/db/schema";
import { cache } from "react";
import { cookies } from "next/headers";
import { GitHub, Google } from "arctic";

export const github = new GitHub(
  process.env.GITHUB_CLIENT_ID!,
  process.env.GITHUB_CLIENT_SECRET!,
);

export const google = new Google(
  process.env.AUTH_GOOGLE_ID!,
  process.env.AUTH_GOOGLE_SECRET!,
  "http://localhost:3000/login/google/callback"
);

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  // authToken: process.env.TURSO_AUTH_TOKEN!,
});
const adapter = new LibSQLAdapter(client, {
  user: "userTable",
  session: "sessionTable",
});

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes(databaseUserAttributes) {
    return {
      email: databaseUserAttributes.email,
      githubId: databaseUserAttributes.githubId,
      username: databaseUserAttributes.username,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<databaseUser, "id" | "password">;
    githubId: number;
    username: string;
  }
}

export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
    } catch { }
    return result;
  },
);
