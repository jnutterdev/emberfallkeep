import { defineMiddleware } from 'astro:middleware';
import { verifySession } from './lib/session';

export const onRequest = defineMiddleware(async (context, next) => {
  context.locals.player = null;

  const token = context.cookies.get('session')?.value;
  const secret = context.locals.runtime?.env?.SESSION_SECRET;

  if (token && secret) {
    context.locals.player = await verifySession(token, secret);
  }

  return next();
});
