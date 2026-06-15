import { PrismaClient } from "@prisma/client";

// ─── Environment Validation ────────────────────────────────────────────────
function validateEnv() {
  const required = [
    "DATABASE_URL",
    "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
    "CLERK_SECRET_KEY",
  ] as const;

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0 && process.env.NODE_ENV === "production") {
    throw new Error(
      `[MuVidya] Missing required environment variables: ${missing.join(", ")}.\n` +
        "Please ensure these are set in your deployment environment."
    );
  }

  if (missing.length > 0 && process.env.NODE_ENV !== "production") {
    console.warn(
      `[MuVidya] Missing environment variables: ${missing.join(", ")}.\n` +
        "Database features will not work until DATABASE_URL is configured."
    );
  }
}

// ─── Prisma Singleton ──────────────────────────────────────────────────────
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  validateEnv();

  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["error", "warn"]
        : ["error"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
}

export const prisma =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}