import type { Server } from "node:http";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { createServer } from "./index";
import {
  CONTACT_RATE_LIMIT,
  CONTENT_SECURITY_POLICY,
  resetContactRateLimit,
  resolveAllowedOrigins,
} from "./security";

const validBody = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "Analytical Engines",
  phone: "+1-555-0100",
  message: "Hello, I would like a demo of your platform.",
};

describe("resolveAllowedOrigins", () => {
  it("uses the public site origins when CORS_ORIGINS is unset", () => {
    expect(
      resolveAllowedOrigins({ NODE_ENV: "production" }, false),
    ).toEqual(["https://logisoftit.com", "https://www.logisoftit.com"]);
  });

  it("uses CORS_ORIGINS in production and ignores a wildcard entry", () => {
    expect(
      resolveAllowedOrigins(
        {
          NODE_ENV: "production",
          CORS_ORIGINS: " https://logisoftit.com, * ,https://preview.example ",
        },
        false,
      ),
    ).toEqual(["https://logisoftit.com", "https://preview.example"]);
  });

  it("adds local dev origins outside production", () => {
    const origins = resolveAllowedOrigins(
      { NODE_ENV: "development", CORS_ORIGINS: "https://logisoftit.com" },
      false,
    );

    expect(origins).toContain("https://logisoftit.com");
    expect(origins).toContain("http://localhost:8080");
    expect(origins).toContain("http://localhost:3000");
  });
});

describe("API security", () => {
  let server: Server;
  let base: string;
  const logs: string[] = [];
  const previousCors = process.env.CORS_ORIGINS;
  const previousNodeEnv = process.env.NODE_ENV;

  beforeAll(async () => {
    process.env.CORS_ORIGINS =
      "https://logisoftit.com,https://www.logisoftit.com";
    process.env.NODE_ENV = "production";

    const app = createServer();
    server = app.listen(0, "127.0.0.1");
    await new Promise<void>((resolve) => server.once("listening", resolve));
    const address = server.address();
    if (!address || typeof address === "string") {
      throw new Error("Test server did not bind to a port");
    }
    base = `http://127.0.0.1:${address.port}`;
  });

  afterAll(async () => {
    if (previousCors === undefined) delete process.env.CORS_ORIGINS;
    else process.env.CORS_ORIGINS = previousCors;
    if (previousNodeEnv === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = previousNodeEnv;

    await new Promise<void>((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  });

  beforeEach(() => {
    resetContactRateLimit();
    logs.length = 0;
    vi.spyOn(console, "info").mockImplementation((message) => {
      logs.push(String(message));
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("sets security headers and hides the Express signature", async () => {
    const response = await fetch(`${base}/api/ping`);

    expect(response.status).toBe(200);
    expect(response.headers.get("x-content-type-options")).toBe("nosniff");
    expect(response.headers.get("x-frame-options")).toBe("DENY");
    expect(response.headers.get("referrer-policy")).toBe(
      "strict-origin-when-cross-origin",
    );
    expect(response.headers.get("content-security-policy")).toBe(
      CONTENT_SECURITY_POLICY,
    );
    expect(response.headers.get("strict-transport-security")).toBe(
      "max-age=31536000; includeSubDomains",
    );
    expect(response.headers.get("x-powered-by")).toBeNull();
  });

  it("allows the site origins and rejects other origins", async () => {
    const allowed = await fetch(`${base}/api/ping`, {
      headers: { Origin: "https://www.logisoftit.com" },
    });
    const blocked = await fetch(`${base}/api/ping`, {
      headers: { Origin: "https://evil.example" },
    });

    expect(allowed.headers.get("access-control-allow-origin")).toBe(
      "https://www.logisoftit.com",
    );
    expect(blocked.headers.get("access-control-allow-origin")).toBeNull();
  });

  it("accepts a contact submission without logging the payload", async () => {
    const response = await fetch(`${base}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validBody),
    });

    expect(response.status).toBe(200);
    expect(response.headers.get("x-request-id")).toMatch(
      /^[0-9a-f-]{36}$/i,
    );
    expect(logs).toEqual([
      `contact requestId=${response.headers.get("x-request-id")} status=accepted`,
    ]);

    const combined = logs.join("\n");
    expect(combined).not.toContain(validBody.email);
    expect(combined).not.toContain(validBody.name);
    expect(combined).not.toContain(validBody.phone);
    expect(combined).not.toContain(validBody.company);
    expect(combined).not.toContain(validBody.message);
  });

  it("accepts the maximum message length under the body cap", async () => {
    const response = await fetch(`${base}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...validBody, message: "a".repeat(5000) }),
    });

    expect(response.status).toBe(200);
  });

  it("rejects an oversized contact body without logging it", async () => {
    const secret = "oversized-secret@example.com";
    const response = await fetch(`${base}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...validBody, email: secret, message: "b".repeat(40000) }),
    });

    expect(response.status).toBe(413);
    expect(logs.join("\n")).not.toContain(secret);
    expect(logs[0]).toMatch(/^contact requestId=.+ status=rejected$/);
  });

  it("rate limits repeated contact posts", async () => {
    for (let attempt = 0; attempt < CONTACT_RATE_LIMIT; attempt += 1) {
      const response = await fetch(`${base}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validBody),
      });
      expect(response.status).toBe(200);
    }

    const limited = await fetch(`${base}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validBody),
    });

    expect(limited.status).toBe(429);
    expect(limited.headers.get("retry-after")).toBeTruthy();
    expect(logs[logs.length - 1]).toMatch(/status=rate_limited$/);
    expect(logs.join("\n")).not.toContain(validBody.email);
  });
});
