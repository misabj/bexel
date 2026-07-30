import { PrismaClient } from "@prisma/client";

/**
 * Prisma client singleton.
 * Prevents exhausting the MySQL connection pool during Next.js hot-reload
 * in development by reusing a single client instance.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
