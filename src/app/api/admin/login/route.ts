import { NextResponse } from "next/server";
import { loginSchema } from "@/lib/validation/schemas";
import { verifyPassword, createSessionCookie } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  // Throttle brute-force attempts: 10 tries per IP per 5 minutes.
  const limit = rateLimit(`login:${clientIp(request)}`, 10, 5 * 60_000);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Please wait and try again." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid password." }, { status: 400 });
  }

  const valid = verifyPassword(parsed.data.password);
  if (!valid) {
    return NextResponse.json({ ok: false, error: "Incorrect password." }, { status: 401 });
  }

  await createSessionCookie();
  return NextResponse.json({ ok: true });
}
