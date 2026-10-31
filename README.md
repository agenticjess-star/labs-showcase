# Labs Showcase

Real repo for the labs hub — not a single HTML file.

- **Stack:** Next.js (App Router), React. shadcn/ui patterns for Button / Badge / Input / Card,
  Hamish Button pattern (cut-corner primary, 32px secondary text link).
- **Routes:** `/` hub, `/projects/[slug]` dedicated page per project.
- **Data:** `lib/projects.json` now (37 projects from the repo audit). This is replaced by a
  Supabase `projects` table once `NEXT_PUBLIC_SUPABASE_URL` and
  `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set. ListenLife lives on the same Supabase backend
  in its own tables: `listenlife_users`, `listenlife_sessions`, `listenlife_datasets`.
  Neon is dropped — do not reintroduce a Neon claim for ListenLife.
- **Deploy:** Vercel, linked to this repo. All changes via PR, never direct to main.

## Design refs (actually inspected)
- https://hamishw.com/ — portfolio home, one dedicated page per project
- https://www.tajmirul.site/ — numbered project list, whole row is the link
- https://github.com/HamishMW/portfolio — project pages, Button component
- https://dribbble.com/shots/26023607-SaaS-Website-Landing-Page — one headline + one primary CTA

## Components
- https://ui.shadcn.com/docs/components/button
- https://ui.shadcn.com/docs/components/badge
- https://ui.shadcn.com/docs/components/input
- https://ui.shadcn.com/docs/components/card
- https://github.com/HamishMW/portfolio/blob/master/app/components/button/button.module.css

## Images
The 4 featured images in `public/images/` are generated concept images, labelled as such
in the UI. They are not screenshots. The other 33 projects get their image in their batch.
