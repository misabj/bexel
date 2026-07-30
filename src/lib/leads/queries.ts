import "server-only";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { toEur } from "@/lib/currency";
import {
  BIM_MATURITY_LABELS,
  COMPANY_SIZE_LABELS,
  PROJECT_TYPE_LABELS,
} from "@/config/options";
import type {
  BimMaturity,
  Currency,
  LeadStatus,
  LeadTemperature,
  ProjectType,
} from "@/types";

/** Filters accepted by the admin lead list and CSV export. */
export interface LeadFilters {
  search?: string;
  temperature?: LeadTemperature;
  status?: LeadStatus;
  country?: string;
  dateFrom?: string;
  dateTo?: string;
  sort?: "createdAt" | "leadScore" | "company" | "projectValue" | "name";
  dir?: "asc" | "desc";
  page?: number;
  pageSize?: number;
}

function buildWhere(filters: LeadFilters): Prisma.LeadWhereInput {
  const where: Prisma.LeadWhereInput = {};

  if (filters.search) {
    const q = filters.search.trim();
    where.OR = [
      { firstName: { contains: q } },
      { lastName: { contains: q } },
      { company: { contains: q } },
      { email: { contains: q } },
    ];
  }
  if (filters.temperature) where.leadTemperature = filters.temperature;
  if (filters.status) where.status = filters.status;
  if (filters.country) where.country = { contains: filters.country.trim() };

  if (filters.dateFrom || filters.dateTo) {
    where.createdAt = {};
    if (filters.dateFrom) where.createdAt.gte = new Date(filters.dateFrom);
    if (filters.dateTo) {
      const to = new Date(filters.dateTo);
      to.setHours(23, 59, 59, 999);
      where.createdAt.lte = to;
    }
  }
  return where;
}

function buildOrderBy(
  filters: LeadFilters,
): Prisma.LeadOrderByWithRelationInput {
  const dir = filters.dir ?? "desc";
  switch (filters.sort) {
    case "leadScore":
      return { leadScore: dir };
    case "company":
      return { company: dir };
    case "name":
      return { firstName: dir };
    case "projectValue":
      return { assessment: { projectValue: dir } };
    case "createdAt":
    default:
      return { createdAt: dir };
  }
}

export interface LeadListItem {
  id: string;
  name: string;
  company: string;
  country: string;
  jobTitle: string;
  projectValue: number | null;
  currency: Currency | null;
  projectType: string | null;
  leadScore: number;
  temperature: LeadTemperature;
  status: LeadStatus;
  createdAt: string;
}

export async function listLeads(
  filters: LeadFilters,
): Promise<{ items: LeadListItem[]; total: number; page: number; pageSize: number }> {
  const page = Math.max(1, filters.page ?? 1);
  const pageSize = Math.min(100, Math.max(5, filters.pageSize ?? 10));
  const where = buildWhere(filters);

  const [rows, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: buildOrderBy(filters),
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        assessment: {
          select: { projectValue: true, currency: true, projectType: true },
        },
      },
    }),
    prisma.lead.count({ where }),
  ]);

  const items: LeadListItem[] = rows.map((lead) => ({
    id: lead.id,
    name: `${lead.firstName} ${lead.lastName}`,
    company: lead.company,
    country: lead.country,
    jobTitle: lead.jobTitle,
    projectValue: lead.assessment?.projectValue ?? null,
    currency: (lead.assessment?.currency as Currency) ?? null,
    projectType: lead.assessment
      ? PROJECT_TYPE_LABELS[lead.assessment.projectType as ProjectType]
      : null,
    leadScore: lead.leadScore,
    temperature: lead.leadTemperature as LeadTemperature,
    status: lead.status as LeadStatus,
    createdAt: lead.createdAt.toISOString(),
  }));

  return { items, total, page, pageSize };
}

export async function getLeadById(id: string) {
  return prisma.lead.findUnique({
    where: { id },
    include: {
      assessment: true,
      roiResult: true,
      activities: { orderBy: { createdAt: "desc" } },
    },
  });
}

export type LeadDetail = NonNullable<Awaited<ReturnType<typeof getLeadById>>>;

// ── Dashboard statistics ──────────────────────────────────────

export interface DashboardStats {
  totalLeads: number;
  hotLeads: number;
  warmLeads: number;
  coldLeads: number;
  avgLeadScore: number;
  avgProjectValueEur: number;
  totalOpportunityEur: number;
  conversionRate: number;
  leadsThisMonth: number;
  leadsByMonth: { month: string; count: number }[];
  leadsByTemperature: { temperature: string; count: number }[];
  leadsByCountry: { country: string; count: number }[];
  leadsByProjectType: { type: string; count: number }[];
  leadsByBimMaturity: { maturity: string; count: number }[];
  scoreDistribution: { bucket: string; count: number }[];
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const leads = await prisma.lead.findMany({
    include: {
      assessment: { select: { projectValue: true, currency: true, projectType: true, bimMaturity: true } },
      roiResult: { select: { totalSavings: true } },
    },
  });

  const total = leads.length;
  const hot = leads.filter((l) => l.leadTemperature === "HOT").length;
  const warm = leads.filter((l) => l.leadTemperature === "WARM").length;
  const cold = leads.filter((l) => l.leadTemperature === "COLD").length;
  const won = leads.filter((l) => l.status === "WON").length;

  const avgScore = total ? leads.reduce((s, l) => s + l.leadScore, 0) / total : 0;

  const projectValuesEur = leads
    .filter((l) => l.assessment)
    .map((l) => toEur(l.assessment!.projectValue, l.assessment!.currency as Currency));
  const avgProjectValueEur = projectValuesEur.length
    ? projectValuesEur.reduce((s, v) => s + v, 0) / projectValuesEur.length
    : 0;

  const totalOpportunityEur = leads.reduce(
    (s, l) => s + (l.roiResult?.totalSavings ?? 0),
    0,
  );

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const leadsThisMonth = leads.filter((l) => l.createdAt >= startOfMonth).length;

  return {
    totalLeads: total,
    hotLeads: hot,
    warmLeads: warm,
    coldLeads: cold,
    avgLeadScore: Math.round(avgScore),
    avgProjectValueEur: Math.round(avgProjectValueEur),
    totalOpportunityEur: Math.round(totalOpportunityEur),
    conversionRate: total ? Math.round((won / total) * 1000) / 10 : 0,
    leadsThisMonth,
    leadsByMonth: leadsByMonth(leads),
    leadsByTemperature: [
      { temperature: "Cold", count: cold },
      { temperature: "Warm", count: warm },
      { temperature: "Hot", count: hot },
    ],
    leadsByCountry: groupCount(leads.map((l) => l.country)).map((g) => ({
      country: g.key,
      count: g.count,
    })),
    leadsByProjectType: groupCount(
      leads
        .filter((l) => l.assessment)
        .map((l) => PROJECT_TYPE_LABELS[l.assessment!.projectType as ProjectType]),
    ).map((g) => ({ type: g.key, count: g.count })),
    leadsByBimMaturity: groupCount(
      leads
        .filter((l) => l.assessment)
        .map((l) => BIM_MATURITY_LABELS[l.assessment!.bimMaturity as BimMaturity]),
    ).map((g) => ({ maturity: g.key, count: g.count })),
    scoreDistribution: scoreBuckets(leads.map((l) => l.leadScore)),
  };
}

function leadsByMonth(
  leads: { createdAt: Date }[],
): { month: string; count: number }[] {
  const months: { month: string; count: number }[] = [];
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
    const count = leads.filter(
      (l) =>
        l.createdAt.getFullYear() === d.getFullYear() &&
        l.createdAt.getMonth() === d.getMonth(),
    ).length;
    months.push({ month: label, count });
  }
  return months;
}

function groupCount(values: string[]): { key: string; count: number }[] {
  const map = new Map<string, number>();
  for (const v of values) map.set(v, (map.get(v) ?? 0) + 1);
  return [...map.entries()]
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count);
}

function scoreBuckets(scores: number[]): { bucket: string; count: number }[] {
  const buckets = [
    { bucket: "0–39 Cold", min: 0, max: 39 },
    { bucket: "40–69 Warm", min: 40, max: 69 },
    { bucket: "70–100 Hot", min: 70, max: 100 },
  ];
  return buckets.map((b) => ({
    bucket: b.bucket,
    count: scores.filter((s) => s >= b.min && s <= b.max).length,
  }));
}

// ── CSV export ────────────────────────────────────────────────

export async function exportLeadsCsv(filters: LeadFilters): Promise<string> {
  const rows = await prisma.lead.findMany({
    where: buildWhere(filters),
    orderBy: buildOrderBy(filters),
    include: { assessment: true, roiResult: true },
  });

  const header = [
    "First name",
    "Last name",
    "Email",
    "Company",
    "Job title",
    "Phone",
    "Country",
    "Company size",
    "Lead score",
    "Temperature",
    "Status",
    "Project type",
    "Project value",
    "Currency",
    "Total savings (EUR)",
    "ROI %",
    "Created at",
  ];

  const lines = rows.map((l) =>
    [
      l.firstName,
      l.lastName,
      l.email,
      l.company,
      l.jobTitle,
      l.phone ?? "",
      l.country,
      COMPANY_SIZE_LABELS[l.companySize as keyof typeof COMPANY_SIZE_LABELS],
      l.leadScore,
      l.leadTemperature,
      l.status,
      l.assessment
        ? PROJECT_TYPE_LABELS[l.assessment.projectType as ProjectType]
        : "",
      l.assessment?.projectValue ?? "",
      l.assessment?.currency ?? "",
      l.roiResult?.totalSavings ?? "",
      l.roiResult?.roiPercentage ?? "",
      l.createdAt.toISOString(),
    ]
      .map(csvCell)
      .join(","),
  );

  return [header.map(csvCell).join(","), ...lines].join("\r\n");
}

function csvCell(value: unknown): string {
  const s = String(value ?? "");
  if (/[",\r\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}
