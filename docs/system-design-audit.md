# System design audit

Audit of this repo against `.cursor/rules/system-design.mdc`. No application code was changed.

This is a Logisoft marketing SPA (React Router) plus a thin Express API (`/api/ping`, `/api/demo`, `POST /api/contact`). Netlify publishes the static build and proxies `/api/*` to a serverless function (`netlify.toml`, `netlify/functions/api.ts`). A long-running Node server also exists (`server/node-build.ts`). Neon Postgres and Drizzle are scaffolded (`notes` table) but nothing in the app reads or writes them.

Expected load is a company site, not a multi-tenant backend. Load balancing, queues, and most database rules do not need a full implementation today. The gaps below are the ones that still matter at this size, plus what to add before the contact form or database is actually used.

`.cursor/rules/` had no other rules, so nothing conflicts with this standard.

## 1. System architecture

**Applies:** Yes, lightly. The API is three routes and the UI does not call them.

**In place**

- Route handlers are separate from the Express app: `server/index.ts`, `server/routes/contact.ts`, `server/routes/demo.ts`.
- Shared response type for the demo route: `shared/api.ts`.
- `POST /api/contact` validates the body with Zod (`server/routes/contact.ts`).
- Config that exists is read from the environment: `PORT`, `PING_MESSAGE`, `DATABASE_URL`, `DATABASE_URL_UNPOOLED` (`server/node-build.ts`, `server/index.ts`, `server/db.ts`, `drizzle.config.ts`).
- The process holds no session or user state. Netlify Functions are stateless by default.

**Gaps**

- Public routes are unversioned (`/api/...`, not `/api/v1/...`).
- No service or data-access layer. The contact handler validates, logs, and responds in one function. Acceptable while it does not touch a database; it will not stay that way if it starts writing rows or sending mail.
- No checked-in `.env.example`. `.gitignore` contains `!.env`, so a secrets file is not ignored.
- `server/db.ts` throws at import time if `DATABASE_URL` is missing, but no route imports it. The client is dead code that would take the process down the moment something does.

**Fixes**

- **High:** Add `.env.example` (`DATABASE_URL`, `DATABASE_URL_UNPOOLED`, `PORT`, `PING_MESSAGE`) and ignore `.env`. Remove the `!.env` exception.
- **Medium:** Version the API (`/api/v1`) before any external client depends on it. Keep Zod at the boundary.
- **Low:** If contact persistence or email is added, put that work in a service. Leave the current three handlers as they are until then.

## 2. Load balancing

**Applies:** Partly. Netlify already runs the API as short-lived functions, so a classic load balancer, sticky sessions, and a long-lived process do not apply to the configured deploy. They do apply to `pnpm start` (`server/node-build.ts`).

**In place**

- No server-side sessions, so sticky sessions are not required.
- `server/node-build.ts` listens for `SIGTERM` and `SIGINT`.
- The SPA fallback treats `/health` as an API path and returns 404 JSON instead of `index.html` (`server/node-build.ts`).

**Gaps**

- There is no `/health` or `/ready` route. The fallback only special-cases a path that does not exist.
- Shutdown calls `process.exit(0)` immediately. It does not stop accepting connections or finish in-flight requests. That is harmless for Netlify Functions and incorrect for the Node server.
- `trust proxy` is unset, so `X-Forwarded-*` is ignored if this process ever sits behind a proxy.

**Fixes**

- **High:** Add `GET /health` (process up) and `GET /ready` (returns 200 without checking a database until the app actually uses one).
- **Medium:** On the Node server, close the HTTP server on `SIGTERM` and exit after in-flight requests finish. Skip this for the Netlify function path.
- **Low:** Call `app.set("trust proxy", 1)` only on the long-running server.

## 3. Caching

**Applies:** Yes for static assets and HTTP headers. An application cache (Redis, LRU) does not: there is no expensive or shared read path.

**In place**

- Vite content-hashes built JS and CSS (`vite.config.ts` `build.outDir`: `dist/spa`). Express static and Netlify can revalidate those with ETags by platform default.
- The UI has no per-user data to cache. React Query is created with defaults and unused for server data (`client/App.tsx`).

**Gaps**

- No `Cache-Control` policy. Hashed build assets are not marked `public, max-age=31536000, immutable`. `express.static` in `server/node-build.ts` uses the default max age of 0.
- `netlify.toml` has no header rules, so HTML, `/api/*`, and files in `public/` share the platform default.
- `public/` images and icons are unhashed. Caching them for a year would serve stale files after a redesign.

**Fixes**

- **High:** On Netlify (and Express static), set immutable long-cache headers for hashed files under `/assets/`, and `no-cache` for `index.html`.
- **Medium:** Set `Cache-Control: no-store` on `/api/*`.
- **Low:** Do not add Redis until a read path is actually hot.

## 4. Database design

**Applies:** Only as a scaffold. The running site does not query Postgres. Do not invent tables, indexes, or pagination for a marketing page.

**In place**

- One normalized table, `notes`, with a primary key and `created_at`: `drizzle/schema.ts`, `drizzle/migrations/0000_optimal_micromacro.sql`.
- Schema changes go through Drizzle migrations (`package.json` `db:generate` / `db:migrate`, `scripts/maybe-migrate.mjs`).
- `scripts/guard-no-drizzle-push.mjs` blocks `drizzle-kit push` so production schema is not edited by hand.
- Neon HTTP driver (`server/db.ts`) does not keep a local connection pool inside the function, which fits serverless.

**Gaps**

- The table and client are unused. Contact submissions are not stored (`server/routes/contact.ts` says "save to database" and then only logs).
- No `updated_at`. No list endpoint, so pagination, extra indexes, and N+1 are not real issues yet.
- No documented backup or restore path for Neon.
- Migrations run only when `FUSION_BRANCH_KIND=feature` and `DATABASE_URL_UNPOOLED` is set (`scripts/maybe-migrate.mjs`). A normal deploy does not migrate.

**Fixes**

- **High:** Decide one of two things. Either wire contact (or another real write) through a migration and the Drizzle client, or stop initializing a database the app does not use.
- **Medium:** When a real table exists, add the indexes that match its filters, paginate any list, and document Neon backups plus how to restore.
- **Low:** Add `updated_at` and soft delete only on tables whose history matters.

## 5. Message queues

**Applies:** No. Nothing in the request path sends email, calls a third party, or does slow work. The contact handler returns immediately after a `console.log`.

**In place:** Nothing. No BullMQ, SQS, or other worker.

**Gaps:** The comments in `server/routes/contact.ts` describe a future email and CRM write on the request path. That would be the first reason to add a queue. Adding one now would be unused infrastructure.

**Fixes**

- **High:** None until contact actually sends mail or writes to a CRM.
- **Medium:** When that work is added, enqueue it, return `202` with a job id, and make the handler idempotent with backoff and a dead-letter path.
- **Low:** Do not introduce a queue for the current site.

## 6. CDN

**Applies:** Yes. This is the main delivery path for the site.

**In place**

- Netlify publishes `dist/spa` (`netlify.toml`), which is served from Netlify's CDN with gzip/brotli and HTTP/2 when deployed.
- Bundled JS/CSS are fingerprinted by Vite.
- A few images use `loading="lazy"` (`client/components/Footer.tsx`).

**Gaps**

- Hero, industry, partner, and FAQ images are hotlinked from `https://www.figma.com/api/mcp/asset/...` in `client/pages/Index.tsx`, `client/components/Footer.tsx`, and `client/components/sections/ServicesSection.tsx`. Those URLs are not a CDN you control, are not fingerprinted, and can break or change without a deploy.
- Raster files in `public/` are PNG (`public/products/`, `public/assets/`). No WebP/AVIF and no responsive `srcset`.
- `public/` filenames are not hashed, so they cannot be cached as immutable.

**Fixes**

- **High:** Move Figma assets into `public/` or the Vite asset graph and stop depending on the Figma MCP asset host.
- **Medium:** Export large photos as WebP or AVIF with a width-appropriate size, and lazy-load below-the-fold images.
- **Low:** Confirm Netlify compression in a deployed response. Do not add a second CDN until there is a measured need.

## 7. Scalability

**Applies:** Yes, at marketing-site scale. Horizontal scaling is already how Netlify Functions work. The first bottleneck is asset delivery, not app CPU.

**In place**

- API handlers are stateless.
- Contact input is bounded by Zod (name 100, message 5000, and similar) in `server/routes/contact.ts`.
- `express.json()` keeps Express's default 100kb body limit (`server/index.ts`).
- No code path loads a table or a large file into memory.

**Gaps**

- No rate limit on `POST /api/contact` or the public GETs. The contact route can be scripted.
- No explicit timeout helper. Nothing outbound exists yet, so this is a future-proofing gap, not a current hang.
- The Node server is a single process with no worker model (`server/node-build.ts`). Fine as a local/production alternative only if one instance is enough.

**Fixes**

- **High:** Rate-limit `POST /api/contact` (Netlify or a small middleware) before the form is exposed.
- **Medium:** Put a timeout on any future HTTP, database, or email call.
- **Low:** Note expected load on new features. For this site the first limit is uncached images and function cold starts, not the React app.

## 8. Reliability and security

**Applies:** Yes. Security applies now. Backup and circuit-breaker machinery mostly does not, because there is no dependency to fail over.

**In place**

- Contact validation uses Zod. There is no string-built SQL.
- The contact `catch` returns a generic 500 and does not send the stack to the client (`server/routes/contact.ts`).
- Vite dev server denies `.env` and `server/**` (`vite.config.ts`).
- Vitest covers the class-name helper and the Drizzle-push guard (`client/lib/utils.spec.ts`, `scripts/guard-no-drizzle-push.test.ts`, `scripts/maybe-migrate.test.ts`).
- No passwords, cookies, or auth, so bcrypt, refresh tokens, and httpOnly cookies are not applicable.

**Gaps**

- `cors()` is called with no allowlist (`server/index.ts`). Any origin can call the API.
- No security headers (CSP, HSTS, `X-Content-Type-Options`, frame protection). No Helmet and no `[[headers]]` in `netlify.toml`.
- `console.log` writes the full contact payload, including email and phone (`server/routes/contact.ts`).
- No central error handler. Ping and demo routes have none.
- No tests for contact validation. No `.github/workflows` runs `pnpm test` or `pnpm ci:guard-no-drizzle-push`.
- No dependency-audit bot (Dependabot or equivalent) in the repo.
- No documented database restore, which matters only after the database is used.

**Fixes**

- **High:** Restrict CORS to the site origin. Add security headers on Netlify and the Express app. Stop logging contact PII; log a request id and outcome only.
- **High:** Add a workflow that runs typecheck, Vitest, and the Drizzle-push guard.
- **Medium:** Add a contact-route test for 400 vs 200. Add a central error handler that never returns stacks.
- **Low:** Turn on Dependabot. Document Neon restore when the database is in use.

## 9. Monitoring

**Applies:** Yes, in a small form: uptime, failed functions, and Core Web Vitals. Request-rate dashboards, queue depth, and cache hit rate do not apply yet.

**In place**

- `console.log` / `console.error` only (`server/routes/contact.ts`, `server/node-build.ts`, `client/pages/NotFound.tsx`).
- Netlify's own function logs exist once deployed. Nothing in the repo configures them.

**Gaps**

- Logs are unstructured, with no level, timestamp field, or request id.
- No Sentry (or similar) on the client or the function.
- No metrics for error rate or latency, and no uptime check. `/health` is not implemented, so there is nothing to probe.
- No Core Web Vitals collection. The hotlinked images in section 6 are the likely LCP risk.

**Fixes**

- **High:** Add an error tracker for the SPA and the Netlify function. Alert on function errors.
- **Medium:** JSON logs with a request id on the API. Uptime check against `/health` after that route exists.
- **Low:** Report LCP, CLS, and INP (Netlify Analytics or `web-vitals`) after images are self-hosted.

## Priority across the nine areas

| Priority | Fix | Why it is first |
| --- | --- | --- |
| High | Security headers, CORS allowlist, no PII in contact logs, ignore `.env` and add `.env.example` | The API is already on the public internet via Netlify |
| High | CI for `pnpm test`, typecheck, and the Drizzle-push guard | Tests exist and nothing runs them |
| High | Self-host marketing images; cache hashed assets and do not cache HTML | The site's real production path is the CDN |
| High | `/health` plus an error tracker | Required before uptime alerts mean anything |
| Medium | Rate-limit contact; `no-store` on `/api/*`; version `/api/v1` when a client appears | Needed once the form is actually posted |
| Low | Queues, Redis, connection pooling, soft deletes, circuit breakers | No workload uses them today |
