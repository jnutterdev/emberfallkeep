export const prerender = false;

import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ cookies, redirect }) => {
  cookies.delete('session', { path: '/' });
  cookies.delete('pd', { path: '/' });
  return redirect('/');
};
