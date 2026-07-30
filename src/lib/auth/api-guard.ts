import { NextResponse } from "next/server";
import { getAdminSession, type AdminSession } from "@/lib/auth";

/**
 * Guard for admin API routes. Returns the session, or a 401 JSON response
 * to return directly from the handler.
 */
export async function requireAdminApi(): Promise<
  { session: AdminSession } | { response: NextResponse }
> {
  const session = await getAdminSession();
  if (!session) {
    return {
      response: NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 }),
    };
  }
  return { session };
}
