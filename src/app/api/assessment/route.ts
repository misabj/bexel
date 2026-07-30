import { NextResponse } from "next/server";
import { assessmentSchema } from "@/lib/validation/schemas";
import { submitAssessment } from "@/lib/leads/assessment-service";
import { rateLimit } from "@/lib/rate-limit";

// Prisma + bcrypt need the Node.js runtime (not edge).
export const runtime = "nodejs";

function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  // Basic rate limiting: 5 submissions per IP per minute.
  const limit = rateLimit(`assessment:${clientIp(request)}`, 5, 60_000);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = assessmentSchema.safeParse(body);
  if (!parsed.success) {
    // Honeypot violations and any invalid input land here — respond generically.
    return NextResponse.json(
      {
        ok: false,
        error: "Please check your inputs and try again.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  try {
    const outcome = await submitAssessment(parsed.data);
    return NextResponse.json(
      {
        ok: true,
        leadId: outcome.leadId,
        result: outcome.result,
        leadScore: outcome.leadScore,
        leadTemperature: outcome.leadTemperature,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("[assessment] submission failed:", err);
    const debug = request.headers.get("x-debug") === "bexel";
    return NextResponse.json(
      {
        ok: false,
        error: "We couldn't save your assessment. Please try again.",
        ...(debug
          ? { debug: err instanceof Error ? `${err.name}: ${err.message}` : String(err) }
          : {}),
      },
      { status: 500 },
    );
  }
}
