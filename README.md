# Next-Gen Learning Dashboard

A high-fidelity Student Dashboard prototype for the Frontend Intern Challenge. Fetches live data from Supabase via Next.js Server Components, renders a dark-mode Bento Grid, and drives all motion via Framer Motion spring physics.

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| Next.js | 16.2.6 | Framework — App Router |
| React | 19.2.4 | UI runtime |
| TypeScript | ^5 | Type safety |
| Tailwind CSS | ^4 | Styling |
| Framer Motion | ^12 | Animations |
| Supabase (`@supabase/ssr`) | ^0.10 | Database + server-side client |
| Lucide React | ^1.17 | Icons |

## Architecture

### Server / Client Component Split

The data-fetching boundary is intentional and strict.

**Server Components (no `"use client"`):**

- `CoursesGrid` — an `async` Server Component that calls Supabase via `@supabase/ssr`'s `createServerClient`. Credentials never leave the server. It is wrapped in a `<Suspense>` boundary in `page.tsx` so the page shell streams immediately while the query runs, showing `CourseSkeleton` in the meantime.

**Client Components (`"use client"`):**

- `BentoContainer` — owns the top-level stagger animation (`staggerChildren: 0.13`). It accepts pre-fetched nodes as `heroSlot`, `coursesSlot`, and `activitySlot` props — a slot pattern that lets Server Component subtrees pass through a Client Component wrapper without forcing them to become client-side too.
- `Sidebar` — collapsible with a spring-physics width animation (`stiffness: 300, damping: 30`) and a `layoutId="sidebar-active-bg"` highlight that morphs between nav items.
- `CourseCardAnimated` — a thin client shell that drives the per-card stagger (`staggerChildren: 0.1`) over the `Course[]` array it receives from `CoursesGrid`.
- `CourseCard`, `HeroTile`, `ActivityTile`, `MobileNav` — hover states, progress bar animations, and entrance effects.

### Bento Grid Layout

`BentoContainer` uses a 12-column CSS grid:

| Slot | Mobile | Tablet+ (`md:`) |
|---|---|---|
| Hero tile | 12 cols | 12 cols |
| Courses grid | 12 cols | 8 cols |
| Activity tile | 12 cols | 4 cols |

On desktop (`≥ 1024px`) the sidebar is fully expanded. On tablet (`768–1023px`) it auto-collapses to icon-only via a `matchMedia` listener. On mobile (`< 768px`) the sidebar is hidden and `MobileNav` renders a bottom navigation bar.

### Animation Strategy — Zero Layout Shifts

Every animation uses only `transform` (scale, translateY) and `opacity`. No `width`, `height`, `margin`, `padding`, or positional properties are animated, guaranteeing zero layout repaints.

- **Staggered page load**: `BentoContainer` → `staggerChildren: 0.13` → tiles fade up with `y: 22 → 0, opacity: 0 → 1`.
- **Course card stagger**: `CourseCardAnimated` → `staggerChildren: 0.1` → each card animates in independently.
- **Spring physics everywhere**: `type: "spring", stiffness: 280–300, damping: 20–28` on all transitions for a natural, non-linear feel.
- **Sidebar active highlight**: `layoutId="sidebar-active-bg"` — Framer Motion interpolates position between items on click.
- **Progress bars**: `motion.div` with `initial={{ width: "0%" }}` animates to the database value on mount.
- **Activity graph**: Each cell scales in with a `delay: index * 0.004s` stagger.

### Error Handling & Loading States

`CoursesGrid` wraps the Supabase call in a try/catch. On any error it falls back to four hardcoded demo courses and renders an amber "Using demo data" badge — the dashboard is always fully functional regardless of database state.

`CourseSkeleton` is shown via `<Suspense>` while the server query is in flight. It uses Tailwind's `animate-pulse` for a subtle shimmer effect.

## Supabase Setup

### Table Schema

```sql
create table courses (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  progress    integer not null default 0,
  icon_name   text not null,
  created_at  timestamptz default now()
);
```

### Seed Data

```sql
insert into courses (title, progress, icon_name) values
  ('Advanced React Patterns', 75, 'Code2'),
  ('TypeScript Mastery',      45, 'FileCode'),
  ('System Design',           30, 'Network'),
  ('Next.js & Full Stack',    60, 'Layers');
```

`icon_name` values must match Lucide React named exports exactly (PascalCase).

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your Supabase project credentials:

```bash
cp .env.example .env.local
```

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API → `anon public` key |

Never commit `.env.local`. It is already listed in `.gitignore`.

## Running Locally

```bash
npm install
cp .env.example .env.local
# Fill in Supabase credentials, then:
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment (Vercel)

1. Push to a public GitHub repository.
2. Import the repo in [Vercel](https://vercel.com).
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel → Settings → Environment Variables.
4. Deploy.

## Challenges

**Hydration mismatch on time-based greeting** — `HeroTile` reads `new Date().getHours()` to pick a greeting string. The server and client can disagree on the current hour, causing a React hydration warning. The fix: initialise the greeting to a static fallback on the server and update it inside `useEffect`, so the client corrects silently after hydration without a mismatch.

**Deterministic activity graph** — The contribution graph uses a seeded PRNG (Mulberry32) instead of `Math.random()`. This guarantees the server render and client hydration produce identical cell values, preventing content mismatches across renders.

**Framer Motion + App Router client boundary** — Components that use `motion.*` must be Client Components. To preserve the Server Component data-fetching tree, animated wrappers (`BentoContainer`, `CourseCardAnimated`) are extracted as thin client shells that accept pre-rendered React nodes as props (slot pattern). This avoids converting entire subtrees to `"use client"` just to animate them.

**Lucide icon dynamic lookup** — `icon_name` is stored as a plain string in Supabase. `CourseCard` resolves it at runtime via `import * as Icons from "lucide-react"` and a keyed lookup, falling back to a generic `BookOpen` icon if the name is not found.
