export interface SessionPayload {
  discordId: string;
  username: string;
  avatar: string | null;
  iat: number;
  exp: number;
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function toBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(value: string): Uint8Array {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (value.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function importHmacKey(secret: string) {
  return crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [
    'sign',
    'verify',
  ]);
}

const THIRTY_DAYS_SECONDS = 60 * 60 * 24 * 30;

export async function createSession(
  user: { discordId: string; username: string; avatar: string | null },
  secret: string,
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    discordId: user.discordId,
    username: user.username,
    avatar: user.avatar,
    iat: now,
    exp: now + THIRTY_DAYS_SECONDS,
  };
  const key = await importHmacKey(secret);
  const body = toBase64Url(encoder.encode(JSON.stringify(payload)));
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(body));
  return `${body}.${toBase64Url(new Uint8Array(signature))}`;
}

export async function verifySession(token: string, secret: string): Promise<SessionPayload | null> {
  const [body, signature] = token.split('.');
  if (!body || !signature) return null;

  const key = await importHmacKey(secret);
  const valid = await crypto.subtle.verify(
    'HMAC',
    key,
    fromBase64Url(signature) as BufferSource,
    encoder.encode(body),
  );
  if (!valid) return null;

  try {
    const payload = JSON.parse(decoder.decode(fromBase64Url(body))) as SessionPayload;
    if (typeof payload.exp !== 'number' || payload.exp * 1000 < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}
