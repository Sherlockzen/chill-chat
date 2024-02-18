import { OAuth2RequestError } from "arctic";
import { cookies } from "next/headers";
import { google, lucia } from "@/server/auth";
import db from "@/server/db/db";
import { eq } from "drizzle-orm";
import { userTable } from "@/server/db/schema";
import { generateId } from "lucia";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("google_oauth_state")?.value ?? null;
  const storedCodeVerifier =
    cookies().get("google_oauth_code_verifier")?.value ?? null;

  if (!code || !state || !storedState || state !== storedState || !storedCodeVerifier) {
    return new Response(null, {
      status: 400,
      statusText: "Bad request"
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(code, storedCodeVerifier);
    const googleUserResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`
      }
    });
    const googleUser = await googleUserResponse.json();

    console.log(googleUser);

    const existingUser = await db
      .select()
      .from(userTable)
      .where(eq(userTable.googleId, googleUser.sub));

    if (existingUser.length > 0) {
      const session = await lucia.createSession(existingUser[0].id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/"
        }
      });
    }

    const userId = generateId(15);
    await db.insert(userTable).values({
      id: userId,
      email: googleUser.email,
      username: googleUser.name,
      googleId: googleUser.sub,
    });
    const session = await lucia.createSession(userId, {});
    const sessionCokie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCokie.name,
      sessionCokie.value,
      sessionCokie.attributes,
    );
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }

}
