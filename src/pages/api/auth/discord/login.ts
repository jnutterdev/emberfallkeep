export const prerender = false;

import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ cookies, redirect, locals }) => {
  const env = locals.runtime.env;
  const state = crypto.randomUUID();

  cookies.set('oauth_state', state, {
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'lax',
    path: '/',
    maxAge: 600,
  });

  const params = new URLSearchParams({
    client_id: env.DISCORD_CLIENT_ID,
    redirect_uri: env.DISCORD_REDIRECT_URI,
    response_type: 'code',
    scope: 'identify guilds.members.read',
    state,
  });

  return redirect(`https://discord.com/oauth2/authorize?${params}`);
};
