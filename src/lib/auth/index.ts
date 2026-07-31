import "server-only";
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";

/**
 * Minimal password-only admin authentication.
 *
 * The administrator signs in with a single shared password. On success we
 * issue a signed, httpOnly JWT session cookie. Route protection is enforced
 * both in middleware (fast, edge) and in server components (defence in depth).
 */

export const SESSION_COOKIE = "bexel_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours

/** Shared admin password. Override with the ADMIN_PASSWORD env var if desired. */
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "adminbexel";

/** Keeps sessions working even when AUTH_SECRET is not explicitly configured. */
export const SESSION_SECRET =
  process.env.AUTH_SECRET ?? "bexel-growth-admin-session-secret-2026";

function getSecret(): Uint8Array {
  return new TextEncoder().encode(SESSION_SECRET);
}

export interface AdminSession {
  role: "admin";
}

/** Constant-time comparison of the submitted password. */
export function verifyPassword(password: string): boolean {
  const expected = ADMIN_PASSWORD;
  if (password.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) {
    mismatch |= password.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0;
}

/** Sign an admin session token. */
export async function signSession(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSecret());
}

/** Verify a session token, returning the session payload or null. */
export async function verifySession(
  token: string | undefined,
): Promise<AdminSession | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (payload.role !== "admin") return null;
    return { role: "admin" };
  } catch {
    return null;
  }
}

/** Create the session cookie (call from a route handler / server action). */
export async function createSessionCookie(): Promise<void> {
  const token = await signSession();
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

/** Clear the session cookie. */
export async function destroySessionCookie(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

/** Read and verify the current admin session from the request cookies. */
export async function getAdminSession(): Promise<AdminSession | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  return verifySession(token);
}
