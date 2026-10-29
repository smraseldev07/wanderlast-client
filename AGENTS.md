# Wanderlast Travel

Single-page Next.js 16 travel landing page plus simple data-driven destination pages. Use `npm` (lockfile is `package-lock.json`; no pnpm/yarn/bun files). The `README.md` is unmodified create-next-app boilerplate — follow this file instead.

## Commands

- `npm run dev` — dev server (Turbopack) at localhost:3000
- `npm run build` — production build
- `npm run lint` — ESLint (flat config: core-web-vitals + TS rules)
- `npx tsc --noEmit` — typecheck (no test suite exists)

## Backend dependency

`/destinations`, `/destinations/[id]`, and `/add-destination` fetch a data API at `http://localhost:5000` (source of truth: `../wanderlast-server/index.js`). Endpoints: `GET /destinations`, `GET /destinations/:id` (looks up by Mongo `_id` **or** the app-generated UUID `id` field), `PATCH /destinations/:id` (Save Changes in the edit dialog), `POST /add-destination`, `POST /destination` (odd path, but real: inserts into the `bookings` collection — used by the Book Now button), and `GET /my-bookings/:email` (bookings filtered by user email). That URL is hardcoded — no env vars exist to change it. Those pages break against a dead API; the landing page `/` works without it.

## Auth (better-auth)

- `src/lib/auth.ts` — better-auth with `@better-auth/mongo-adapter`, database `wanderlast`, email/password enabled. The MongoDB is a **remote Atlas cluster** (from `MONGODB_URI`), not localhost.
- Route handler: `src/app/api/auth/[...all]/route.ts` (`toNextJsHandler`); client: `authClient` in `src/lib/auth-client.ts`.
- `/signup` and `/signin` are client pages using `authClient`; both have a Google button calling `signIn.social` — but `auth.ts` configures no `socialProviders`, so Google sign-in/up errors. `/signin`'s "Forgot password?" link is a dead `#` anchor (no route/flow exists).
- Requires `.env` with `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `MONGODB_URI`. `.env*` is gitignored — a fresh clone has no `.env` and auth fails without one. Never commit real credentials.

## Stack quirks

- **React Compiler is always on** (`reactCompiler: true` in `next.config.ts`) — components get memoized automatically; don't add manual `useMemo`/`memo` workarounds. Don't flip other flags, either: `cacheComponents` and `partialPrefetching` are deliberately off.
- **Tailwind v4**: CSS-first config — theme tokens live in `src/app/globals.css` (`@theme inline`). There is no `tailwind.config.ts`; Turbopack handles Tailwind via the `*.css` loader rule in `next.config.ts` (no separate PostCSS config).
- **shadcn/ui**: configured in `components.json` with style `base-nova` and `rsc: true`. Adding components the intended way is `npx shadcn@latest add <component>`. Generated components land in `src/components/ui/`; edit those files freely (they are owned by this repo, not a package). Aliases: `@/components`, `@/lib`, `@/hooks`, `@/lib/utils` (the `cn()` helper).
- Icons come from `lucide-react`; static assets are in `public/images/` (Wanderlast branding, `destinations/`).

## Routes and repo structure

- `/` (`src/app/page.tsx`) composes the content sections (Banner, WhyChooseUs, Testimonials, Cta) from `src/components/`. It still imports `Navbar`/`Footer` without rendering them — the layout owns them; don't "fix" this.
- `Navbar` and `Footer` render in `src/app/layout.tsx`.
- `/destinations`, `/destinations/[id]`, `/add-destination` under `src/app/` — see Backend dependency. `/destinations/[id]` is a full detail page: server-side fetch via `PageProps<'/destinations/[id]'>`, with `EditDestinationdailoge` (the misspelled filename is intentional-looking; renaming it breaks imports) providing the Save Changes dialog that PATCHes the API.
- `/my-bookings` is a client page: it requires being signed in, fetches `GET /my-bookings/:email`, and lists the destinations the user booked. Bookings are created only by the Book Now button on `/destinations/[id]` (POSTs an email + destination snapshot to `POST /destination`; the server has **no** booking delete/cancel endpoint, so a booked row is permanent from the app's perspective).
- `src/lib/` and `src/hooks/` hold small helpers (`cn()`, `use-mobile`) plus auth (see above) and a shiki code highlighter (`src/lib/highlighter.tsx`, `src/hooks/use-highlighted-code.ts`). Some `ui/` components (`code-block`, `questionnaire`, …) and the highlighter are not used by any page yet. There is no state library or data layer.

## Conventions

- `layout.tsx` loads Geist, Geist Mono, and Playfair Display via `next/font` as CSS variables; theme aliases like `--font-display` (Playfair) are wired in `globals.css`.
- The site is deliberately light-only: `globals.css` forces `color-scheme: light` on `:root`, so OS dark preference never changes rendering. Check that comment before adding dark-mode "fixes".
- `LayoutProps<"/">` type in `layout.tsx`: generic route-typed layout props come from Next's type generation (`next-env.d.ts` is generated; don't hand-edit).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
