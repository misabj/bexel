"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Trash2, Loader2 } from "lucide-react";
import { StatusBadge, TemperatureBadge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/currency";
import { formatDate } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import type { LeadListItem } from "@/lib/leads/queries";
import type { Currency } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries";

type LeadsLabels = Dictionary["admin"]["leads"];

export function LeadRow({ lead, l }: { lead: LeadListItem; l: LeadsLabels }) {
  const router = useRouter();
  const { toast } = useToast();
  const [deleting, setDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  function openLead() {
    router.push(`/admin/leads/${lead.id}`);
  }

  function requestDelete(e: React.MouseEvent) {
    e.stopPropagation();
    setConfirmOpen(true);
  }

  async function confirmDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/leads/${lead.id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !data.ok) throw new Error();
      toast(l.deleted, "success");
      setConfirmOpen(false);
      router.refresh();
    } catch {
      toast(l.deleteError, "error");
      setDeleting(false);
    }
  }

  return (
    <tr onClick={openLead} className="cursor-pointer transition hover:bg-slate-50 dark:hover:bg-ink-700/30">
      <td className="px-4 py-3 font-medium text-brand-900 dark:text-white">{lead.name}</td>
      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{lead.company}</td>
      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{lead.country}</td>
      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{lead.jobTitle}</td>
      <td className="px-4 py-3 text-right font-medium text-brand-900 dark:text-white">
        {lead.projectValue != null
          ? formatCurrency(lead.projectValue, (lead.currency as Currency) ?? "EUR")
          : "—"}
      </td>
      <td className="px-4 py-3 font-bold text-brand-900 dark:text-white">{lead.leadScore}</td>
      <td className="px-4 py-3">
        <TemperatureBadge value={lead.temperature} />
      </td>
      <td className="px-4 py-3">
        <StatusBadge value={lead.status} />
      </td>
      <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{formatDate(lead.createdAt)}</td>
      <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-end gap-3">
          <Link
            href={`/admin/leads/${lead.id}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-accent-600 hover:text-accent-700"
          >
            {l.view}
            <ChevronRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={requestDelete}
            disabled={deleting}
            aria-label={l.delete}
            title={l.delete}
            className="inline-flex items-center rounded-lg p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50 dark:text-slate-500 dark:hover:bg-red-500/10 dark:hover:text-red-400"
          >
            {deleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </button>
        </div>
      </td>
      <ConfirmDialog
        open={confirmOpen}
        title={l.deleteTitle}
        message={l.deleteConfirm}
        confirmLabel={l.delete}
        cancelLabel={l.cancel}
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </tr>
  );
}
