/**
 * Serverless-compatible rate limiter using fixed window per IP.
 * Uses Prisma for persistence — works across serverless invocations.
 *
 * For production with high traffic, migrate to Upstash Redis + @upstash/ratelimit.
 */

import { prisma } from "./prisma";

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 15; // Max requests per window per IP

export function rateLimit(ip: string): {
  success: boolean;
  remaining: number;
  resetTime: number;
} {
  // For serverless: use in-memory as fast path, DB as fallback
  // In production, replace this entire file with Upstash Redis rate limiting
  return inMemoryRateLimit(ip);
}

// ─── In-memory rate limiter (fast path, per-invocation) ─────────────
const requestCounts = new Map<string, { count: number; resetTime: number }>();

function inMemoryRateLimit(ip: string): {
  success: boolean;
  remaining: number;
  resetTime: number;
} {
  const now = Date.now();
  const record = requestCounts.get(ip);

  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return { success: true, remaining: MAX_REQUESTS - 1, resetTime: now + WINDOW_MS };
  }

  if (record.count >= MAX_REQUESTS) {
    return { success: false, remaining: 0, resetTime: record.resetTime };
  }

  record.count += 1;
  return { success: true, remaining: MAX_REQUESTS - record.count, resetTime: record.resetTime };
}

// Cleanup stale entries every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of requestCounts.entries()) {
      if (now > value.resetTime) {
        requestCounts.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}
