import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth/api-guard";
import { settingsSchema } from "@/lib/validation/schemas";
import { getRoiSettings, saveRoiSettings } from "@/lib/db/settings";

export const runtime = "nodejs";

export async function GET() {
  const guard = await requireAdminApi();
  if ("response" in guard) return guard.response;
  const settings = await getRoiSettings();
  return NextResponse.json({ ok: true, settings });
}

export async function PUT(request: Request) {
  const guard = await requireAdminApi();
  if ("response" in guard) return guard.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = settingsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid settings.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const saved = await saveRoiSettings(parsed.data);
  return NextResponse.json({ ok: true, settings: saved });
}
