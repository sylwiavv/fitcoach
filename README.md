# FitCoach — Next.js 16 + React 19

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in NEXT_PUBLIC_SUPABASE_*
npm run dev
```

- **Dev:** [http://localhost:3000](http://localhost:3000)
- **Production:** `npm run build` → `npm start`

## Structure

- **`src/app/`** — App Router (Next.js routes). Screen-level UI lives in **`src/views/`** (Next reserves `src/pages/` for the Pages Router).
- **`src/shell/`** — app shell (MainLayout, icons, calendar styles).
- **`src/entities/`**, **`src/components/`**, **`src/widgets/`**, **`src/shared/`** — same FSD-style split as before.

## Performance & caching (Next)

- **`next.config.ts`:** `experimental.optimizePackageImports` (recharts, TanStack Table, react-calendar, dayjs), `experimental.staleTimes` (client router cache), `turbopack.root`.
- **Root layout:** `next/font/google` (Urbanist, `display: swap`, preload).
- **`(main)/layout`:** `dynamic = 'force-dynamic'` (Supabase + React Query on the client; no misleading static generation without env).
- **`loading.tsx`:** loading UI + `Suspense` around `{children}`.
- **Navbar:** `<Link prefetch>` instead of only `router.push`.
- **React Query:** `staleTime` / `gcTime` / `refetchOnWindowFocus: false` in `src/app/providers.tsx`.

## Environment variables

Vite used `VITE_SUPABASE_*`. Now use **`NEXT_PUBLIC_SUPABASE_URL`** and **`NEXT_PUBLIC_SUPABASE_ANON_KEY`** (see `.env.example`).

Build can still succeed without real keys (placeholders in `next.config` / Supabase client); set real values in production.
