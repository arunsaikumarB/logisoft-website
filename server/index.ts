import "dotenv/config";
import express from "express";
import { handleDemo } from "./routes/demo";
import { handleContact } from "./routes/contact";
import {
  CONTACT_BODY_LIMIT,
  apiErrorHandler,
  buildCors,
  contactRateLimit,
  contactRequestId,
  isContactPost,
  securityHeaders,
} from "./security";

type CreateServerOptions = {
  /** Skip CSP and HSTS so the Vite dev client can run. */
  dev?: boolean;
};

export function createServer(options: CreateServerOptions = {}) {
  const app = express();
  const dev = options.dev === true;

  app.disable("x-powered-by");
  app.use(securityHeaders(dev));
  app.use(buildCors(dev));

  app.use((req, res, next) => {
    if (!isContactPost(req)) return next();
    contactRequestId(req, res);
    return contactRateLimit(req, res, next);
  });

  // Caps POST /api/contact, the only route that reads a body.
  app.use(express.json({ limit: CONTACT_BODY_LIMIT }));
  app.use(express.urlencoded({ extended: true, limit: CONTACT_BODY_LIMIT }));

  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.post("/api/contact", handleContact);

  app.use(apiErrorHandler);

  return app;
}
