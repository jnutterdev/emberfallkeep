export const prerender = false;

import type { APIRoute } from 'astro';
import { createSession } from '../../../../lib/session';

interface DiscordTokenResponse {
  access_token: string;
}

interface DiscordUser {
  id: string;
  username: string;
  global_name: string | null;
  avatar: string | null;
}

export const GET: APIRoute = async ({ url, cookies, redirect, locals }) => {
  const env = locals.runtime.env;

  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const savedState = cookies.get('oauth_state')?.value;
  cookies.delete('oauth_state', { path: '/' });

  if (!code || !state || !savedState || state !== savedState) {
    return redirect('/characters?auth_error=state');
  }

  const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: env.DISCORD_CLIENT_ID,
      client_secret: env.DISCORD_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code,
      redirect_uri: env.DISCORD_REDIRECT_URI,
    }),
  });
  if (!tokenRes.ok) return redirect('/characters?auth_error=token');
  const { access_token: accessToken } = await tokenRes.json<DiscordTokenResponse>();

  const userRes = await fetch('https://discord.com/api/users/@me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!userRes.ok) return redirect('/characters?auth_error=user');
  const user = await userRes.json<DiscordUser>();
  const displayName = user.global_name ?? user.username;

  await env.DB.prepare(
    `INSERT INTO players (discord_id, username, avatar, created_at, updated_at)
     VALUES (?1, ?2, ?3, unixepoch(), unixepoch())
     ON CONFLICT(discord_id) DO UPDATE SET
       username = excluded.username,
       avatar = excluded.avatar,
       updated_at = unixepoch()`,
  )
    .bind(user.id, displayName, user.avatar)
    .run();

  const token = await createSession(
    { discordId: user.id, username: displayName, avatar: user.avatar },
    env.SESSION_SECRET,
  );

  const cookieOptions = {
    secure: import.meta.env.PROD,
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  };

  cookies.set('session', token, { ...cookieOptions, httpOnly: true });
  // Non-HttpOnly, display-only — read client-side by Nav.astro on static pages.
  // Never used for authorization; the HttpOnly `session` cookie is always
  // re-verified server-side before granting edit access.
  cookies.set('pd', displayName, { ...cookieOptions, httpOnly: false });

  return redirect('/characters');
};
