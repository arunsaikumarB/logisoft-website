import { randomUUID } from "node:crypto";
import cors from "cors";
import type { ErrorRequestHandler, Request, RequestHandler, Response } from "express";

/** Large enough for a 5000-character contact message, small enough to reject bulk payloads. */
export const CONTACT_BODY_LIMIT = "32kb";
export const CONTACT_RATE_LIMIT = 10;
const CONTACT_RATE_WINDOW_MS = 15 * 60 * 1000;

/** Public site origins. Override with the CORS_ORIGINS env var. */
export const SITE_ORIGINS = [
  "https://logisoftit.com",
  "https://www.logisoftit.com",
];

const LOCAL_DEV_ORIGINS = [
  "http://localhost:8080",
  "http://127.0.0.1:8080",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

/**
 * CSP for the production SPA.
 * Allows the Google Fonts stylesheet, self-hosted media, Figma marketing
 * images, and Simple Icons. React inline style attributes need unsafe-inline.
 * Keep this string in sync with the [[headers]] block in netlify.toml.
 */
export const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "script-src 'self'",
  "script-src-attr 'none'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https://www.figma.com https://cdn.simpleicons.org",
  "media-src 'self'",
  "connect-src 'self'",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
].join("; ");

export const HSTS_HEADER = "max-age=31536000; includeSubDomains";

export function resolveAllowedOrigins(
  env: NodeJS.ProcessEnv = process.env,
  dev = false,
): string[] {
  const configured = (env.CORS_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0 && origin !== "*");

  const origins = new Set<string>(
    configured.length > 0 ? configured : SITE_ORIGINS,
  );

  if (dev || env.NODE_ENV !== "production") {
    for (const origin of LOCAL_DEV_ORIGINS) origins.add(origin);
  }

  return [...origins];
}

export function buildCors(dev = false) {
  return cors({
    origin(origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }

      const allowed = new Set(resolveAllowedOrigins(process.env, dev));
      callback(null, allowed.has(origin));
    },
  });
}

export function securityHeaders(dev: boolean): RequestHandler {
  return (_req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

    // Vite's dev client needs eval and inline scripts. Production responses
    // (Netlify function and `pnpm start`) get the locked-down policy.
    if (!dev) {
      res.setHeader("Content-Security-Policy", CONTENT_SECURITY_POLICY);
      res.setHeader("Strict-Transport-Security", HSTS_HEADER);
    }

    next();
  };
}

export function isContactPost(req: Request): boolean {
  if (req.method !== "POST") return false;
  const path = (req.originalUrl || req.url || req.path || "").split("?")[0];
  return path === "/api/contact" || path.endsWith("/api/contact");
}

export function contactRequestId(req: Request, res: Response): string {
  const current = res.getHeader("X-Request-Id");
  if (typeof current === "string" && current.length > 0) return current;

  const incoming = req.get("x-request-id") ?? "";
  const id = /^[A-Za-z0-9_-]{1,80}$/.test(incoming) ? incoming : randomUUID();
  res.setHeader("X-Request-Id", id);
  return id;
}

/** Logs a contact outcome without the form body. */
export function logContact(res: Response, status: string): void {
  const id = res.getHeader("X-Request-Id");
  const requestId = typeof id === "string" ? id : "unknown";
  console.info(`contact requestId=${requestId} status=${status}`);
}

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export function resetContactRateLimit(): void {
  buckets.clear();
}

function clientAddress(req: Request): string {
  // Set by Netlify and not taken from the client-supplied forwarded chain.
  const netlifyIp = req.get("x-nf-client-connection-ip")?.trim();
  if (netlifyIp) return netlifyIp;
  return req.socket?.remoteAddress || "unknown";
}

export const contactRateLimit: RequestHandler = (req, res, next) => {
  const now = Date.now();

  if (buckets.size > 1000) {
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(key);
    }
  }

  const key = clientAddress(req);
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + CONTACT_RATE_WINDOW_MS });
    next();
    return;
  }

  if (existing.count >= CONTACT_RATE_LIMIT) {
    const retryAfter = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
    res.setHeader("Retry-After", String(retryAfter));
    logContact(res, "rate_limited");
    res.status(429).json({
      success: false,
      message: "Too many requests. Please try again later.",
    });
    return;
  }

  existing.count += 1;
  next();
};

export const apiErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    next(err);
    return;
  }

  const statusCode = errorStatus(err);

  if (isContactPost(req)) {
    contactRequestId(req, res);
    logContact(res, statusCode === 413 || statusCode === 400 ? "rejected" : "error");
  }

  if (statusCode === 413) {
    res.status(413).json({
      success: false,
      message: "Request body is too large",
    });
    return;
  }

  if (statusCode === 400) {
    res.status(400).json({
      success: false,
      message: "Invalid request body",
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: "An error occurred processing your request",
  });
};

function errorStatus(err: unknown): number {
  if (typeof err !== "object" || err === null) return 500;

  if ("status" in err && typeof err.status === "number") return err.status;
  if ("statusCode" in err && typeof err.statusCode === "number") {
    return err.statusCode;
  }

  return 500;
}
