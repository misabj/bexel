import { DEFAULT_ROI_SETTINGS } from "@/config/assumptions";
import { prisma } from "@/lib/db";
import type { RoiSettings } from "@/types";

/**
 * Read the active calculator settings.
 * Falls back to the compiled-in defaults if the row is missing or the
 * database is unreachable, so the calculator always works.
 */
export async function getRoiSettings(): Promise<RoiSettings> {
  try {
    const row = await prisma.calculatorSettings.findUnique({
      where: { id: "default" },
    });
    if (!row) return DEFAULT_ROI_SETTINGS;
    return {
      hourlyEmployeeCost: row.hourlyEmployeeCost,
      reportingReductionRate: row.reportingReductionRate,
      searchReductionRate: row.searchReductionRate,
      delayReductionRate: row.delayReductionRate,
      changeReductionRate: row.changeReductionRate,
      duplicatedWorkReductionRate: row.duplicatedWorkReductionRate,
      defaultSoftwareCost: row.defaultSoftwareCost,
    };
  } catch {
    return DEFAULT_ROI_SETTINGS;
  }
}

/** Upsert the calculator settings row and return the new values. */
export async function saveRoiSettings(settings: RoiSettings): Promise<RoiSettings> {
  await prisma.calculatorSettings.upsert({
    where: { id: "default" },
    update: settings,
    create: { id: "default", ...settings },
  });
  return settings;
}
