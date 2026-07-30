"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  CalendarClock,
  Send,
  FileDown,
  Loader2,
  MessageSquarePlus,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Select, Textarea } from "@/components/ui/form";
import { useToast } from "@/components/ui/Toast";
import { LEAD_STATUS_OPTIONS } from "@/config/options";
import type { LeadStatus } from "@/types";

export function LeadActions({
  leadId,
  currentStatus,
}: {
  leadId: string;
  currentStatus: LeadStatus;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [status, setStatus] = useState<LeadStatus>(currentStatus);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState<string | null>(null);

  const call = async (fn: () => Promise<Response>, okMessage: string, key: string) => {
    setBusy(key);
    try {
      const response = await fn();
      const data = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!response.ok || data.ok === false) {
        toast(data.error ?? "Action failed.", "error");
        return;
      }
      toast(okMessage, "success");
      router.refresh();
    } catch {
      toast("Network error.", "error");
    } finally {
      setBusy(null);
    }
  };

  const changeStatus = (next: LeadStatus) => {
    setStatus(next);
    call(
      () =>
        fetch(`/api/leads/${leadId}/status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: next }),
        }),
      "Status updated.",
      "status",
    );
  };

  const runAction = (action: "contacted" | "demo" | "follow_up", label: string) =>
    call(
      () =>
        fetch(`/api/leads/${leadId}/actions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action }),
        }),
      label,
      action,
    );

  const addNote = () => {
    if (!note.trim()) {
      toast("Write a note first.", "error");
      return;
    }
    call(
      () =>
        fetch(`/api/leads/${leadId}/notes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ note }),
        }),
      "Note added.",
      "note",
    ).then(() => setNote(""));
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="lead-status" className="label">
          Status
        </label>
        <Select
          id="lead-status"
          value={status}
          onChange={(e) => changeStatus(e.target.value as LeadStatus)}
          disabled={busy === "status"}
        >
          {LEAD_STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <Button variant="primary" onClick={() => runAction("contacted", "Marked as contacted.")} disabled={busy === "contacted"}>
          {busy === "contacted" ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
          Mark as Contacted
        </Button>
        <Button variant="outline" onClick={() => runAction("demo", "Demo scheduled.")} disabled={busy === "demo"}>
          {busy === "demo" ? <Loader2 className="h-4 w-4 animate-spin" /> : <CalendarClock className="h-4 w-4" />}
          Schedule Demo
        </Button>
        <Button variant="outline" onClick={() => runAction("follow_up", "Follow-up sent.")} disabled={busy === "follow_up"}>
          {busy === "follow_up" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          Send Follow-up
        </Button>
        <Link href={`/report/${leadId}`} target="_blank">
          <Button variant="ghost" className="w-full">
            <FileDown className="h-4 w-4" />
            Export PDF
          </Button>
        </Link>
      </div>

      <div>
        <label htmlFor="lead-note" className="label">
          Add internal note
        </label>
        <Textarea
          id="lead-note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Log a call, context or next step…"
        />
        <Button className="mt-2 w-full" variant="accent" onClick={addNote} disabled={busy === "note"}>
          {busy === "note" ? <Loader2 className="h-4 w-4 animate-spin" /> : <MessageSquarePlus className="h-4 w-4" />}
          Save note
        </Button>
      </div>
    </div>
  );
}
