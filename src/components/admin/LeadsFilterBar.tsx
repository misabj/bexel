"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Download, Search, X } from "lucide-react";
import { Input, Select } from "@/components/ui/form";
import { Button } from "@/components/ui/Button";
import { useT } from "@/i18n/provider";
import { LEAD_STATUS_OPTIONS } from "@/config/options";

export function LeadsFilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const t = useT();
  const l = t.admin.leads;

  const [search, setSearch] = useState(params.get("search") ?? "");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const update = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      next.delete("page"); // reset pagination on filter change
      router.push(`${pathname}?${next.toString()}`);
    },
    [params, pathname, router],
  );

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if ((params.get("search") ?? "") !== search) update("search", search);
    }, 350);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const exportUrl = `/api/leads/export?${params.toString()}`;
  const hasFilters = ["search", "temperature", "status", "country", "dateFrom", "dateTo"].some(
    (k) => params.get(k),
  );

  const clearAll = () => router.push(pathname);

  return (
    <div className="card space-y-4">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <div className="relative lg:col-span-2">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <Input
            placeholder={l.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            aria-label="Search leads"
          />
        </div>
        <Select
          aria-label="Filter by temperature"
          value={params.get("temperature") ?? ""}
          onChange={(e) => update("temperature", e.target.value)}
        >
          <option value="">{l.allTemperatures}</option>
          <option value="HOT">{t.admin.temperatures.HOT}</option>
          <option value="WARM">{t.admin.temperatures.WARM}</option>
          <option value="COLD">{t.admin.temperatures.COLD}</option>
        </Select>
        <Select
          aria-label="Filter by status"
          value={params.get("status") ?? ""}
          onChange={(e) => update("status", e.target.value)}
        >
          <option value="">{l.allStatuses}</option>
          {LEAD_STATUS_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {t.admin.statuses[o.value] ?? o.label}
            </option>
          ))}
        </Select>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <Input
          placeholder={l.country}
          aria-label="Filter by country"
          defaultValue={params.get("country") ?? ""}
          onBlur={(e) => update("country", e.target.value)}
        />
        <Input
          type="date"
          aria-label="Created from"
          defaultValue={params.get("dateFrom") ?? ""}
          onChange={(e) => update("dateFrom", e.target.value)}
        />
        <Input
          type="date"
          aria-label="Created to"
          defaultValue={params.get("dateTo") ?? ""}
          onChange={(e) => update("dateTo", e.target.value)}
        />
        <div className="flex gap-2">
          {hasFilters ? (
            <Button variant="ghost" onClick={clearAll} className="flex-1">
              <X className="h-4 w-4" />
              {l.clear}
            </Button>
          ) : null}
          <a href={exportUrl} className="flex-1">
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4" />
              {l.exportCsv}
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
