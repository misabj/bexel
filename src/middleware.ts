import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

/**
 * Edge middleware that guards every /admin route (except the login page).
 * Verifies the signed session JWT; unauthenticated requests are redirected
 * to the login screen. Uses `jose` only, which runs on the edge runtime.
 */

const SESSION_COOKIE = "bexel_admin_session";

async function isAuthenticated(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const secret =
    process.env.AUTH_SECRET ?? "bexel-growth-admin-session-secret-2026";
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLogin = pathname === "/admin/login";
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const authed = await isAuthenticated(token);

  if (!authed && !isLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  if (authed && isLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
