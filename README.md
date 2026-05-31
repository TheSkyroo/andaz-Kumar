# Next-Gen Learning Dashboard

A high-fidelity student dashboard prototype built with Next.js App Router, Supabase, Tailwind CSS, and Framer Motion.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Architecture

### Server / Client Component Split

Data fetching happens exclusively in **Server Components**:

- `CoursesGrid` is an `async` Server Component that calls Supabase directly using `@supabase/ssr`'s `createServerClient`. No API route is needed — the query runs server-side before the HTML is streamed to the browser.
- `CoursesGrid` is wrapped in a `<Suspense>` boundary in `page.tsx`, so Next.js streams the page shell immediately and fills in the courses section once the Supabase query resolves — showing `CourseSkeleton` in the meantime.

All **interactivity and animations** live in Client Components (`"use client"`):

- `Sidebar` — collapsible with spring-physics width animation and `layoutId`-based active highlight.
- `CourseCardAnimated` — staggered entrance animation container.
- `CourseCard` — hover spring-physics scale + glow, animated progress bar.
- `ActivityTile`, `HeroTile`, `MobileNav` — entrance animations and hover states.

### Zero Layout Shift Strategy

All hover states use only `transform` (via Framer Motion's `scale`) and `opacity` / `box-shadow`. No width, height, margin, or padding changes are triggered on hover, preventing any layout repaints.

### Graceful Error Handling

If the Supabase connection fails, `CoursesGrid` catches the error and falls back to hardcoded demo data, displaying a "Using demo data" badge. The user always sees a complete, functional dashboard.

## Supabase Setup

1. Create a free project at [supabase.com](https://supabase.com).
2. Run the SQL in `supabase/seed.sql` in the Supabase SQL Editor.
3. Copy your Project URL and `anon` key from **Settings → API**.
4. Add them to `.env.local` (see `.env.example`).

## Running Locally

```bash
npm install
cp .env.example .env.local
# Fill in your Supabase credentials in .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment (Vercel)

1. Push to a public GitHub repository.
2. Import the repo in [Vercel](https://vercel.com).
3. Add the two environment variables in Vercel's project settings.
4. Deploy.

## Challenges

- **Lucide dynamic imports**: Lucide exports every icon as a named export. To dynamically render an icon from a string stored in the database, the component imports the entire namespace (`import * as LucideIcons from "lucide-react"`) and looks up the icon by name at runtime.
- **Tailwind v4 + CSS variables**: Tailwind v4 moves config into CSS. Custom gradients and grain textures are defined as plain CSS classes in `globals.css` rather than arbitrary Tailwind values, keeping the markup clean.
- **Stagger + Suspense**: Server Component fetches data → passes it as props to `CourseCardAnimated` (Client Component) → Client Component drives the stagger via Framer Motion's `variants` and `staggerChildren`.
