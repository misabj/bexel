import "server-only";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";

/**
 * Minimal, self-contained admin authentication.
 *
 * A single administrator logs in with credentials stored as environment
 * variables (email + bcrypt password hash). On success we issue a signed,
 * httpOnly JWT session cookie. Route protection is enforced both in
 * middleware (fast, edge) and in server components (defence in depth).
 */

export const SESSION_COOKIE = "bexel_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours

function getSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("AUTH_SECRET is missing or too short (min 16 chars).");
  }
  return new TextEncoder().encode(secret);
}

export interface AdminSession {
  email: string;
  role: "admin";
}

/** Validate submitted credentials against the configured admin account. */
export async function verifyCredentials(
  email: string,
  password: string,
): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!adminEmail || !hash) return false;
  if (email.trim().toLowerCase() !== adminEmail) return false;
  try {
    return await bcrypt.compare(password, hash);
  } catch {
    return false;
  }
}

/** Sign a session token for the given admin email. */
export async function signSession(email: string): Promise<string> {
  return new SignJWT({ email, role: "admin" })
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
    if (payload.role !== "admin" || typeof payload.email !== "string") return null;
    return { email: payload.email, role: "admin" };
  } catch {
    return null;
  }
}

/** Create the session cookie (call from a route handler / server action). */
export async function createSessionCookie(email: string): Promise<void> {
  const token = await signSession(email);
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

/** Hash a plaintext password (used by the CLI helper script). */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}
