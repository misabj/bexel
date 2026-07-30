import "server-only";

/**
 * Email delivery service.
 *
 * For the MVP this logs a structured entry to the server console (a
 * "development log") instead of sending real mail. The interface is
 * intentionally provider-agnostic so a real transport (Resend, SendGrid,
 * SMTP) can be dropped in without touching call sites: implement the
 * `RESEND_API_KEY` branch below.
 */

export interface EmailMessage {
  to: string;
  subject: string;
  html: string;
  /** Logical category for observability. */
  kind: "client_assessment" | "sales_notification" | "follow_up";
}

export interface EmailResult {
  ok: boolean;
  provider: "console" | "resend";
  id?: string;
  error?: string;
}

export async function sendEmail(message: EmailMessage): Promise<EmailResult> {
  const from = process.env.EMAIL_FROM ?? "BEXEL Growth <no-reply@bexel-demo.com>";
  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: message.to,
          subject: message.subject,
          html: message.html,
        }),
      });
      if (!res.ok) {
        const error = await res.text();
        return { ok: false, provider: "resend", error };
      }
      const data = (await res.json()) as { id?: string };
      return { ok: true, provider: "resend", id: data.id };
    } catch (err) {
      return {
        ok: false,
        provider: "resend",
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }
  }

  // Development log fallback — no external provider configured.
  // eslint-disable-next-line no-console
  console.info(
    `[email:${message.kind}] → ${message.to} | ${message.subject} | from ${from} | ${message.html.length} bytes`,
  );
  return { ok: true, provider: "console", id: `dev-${Date.now()}` };
}
