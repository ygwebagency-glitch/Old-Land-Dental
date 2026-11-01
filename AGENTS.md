<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules (Oldland Dental Practice website)

- All practice facts (phone, address, links, hours, prices, team, treatments, testimonials) live in `src/data/*.ts`; components never hardcode them — one edit updates the whole site.
- Every image goes through `SmartImage` with a key from `src/config/images.ts`; swapping a `src` there must not require layout changes.
- Inner pages use the `InnerPage` template (hero, breadcrumbs, optional side nav, shared bottom sections) so page markup is never duplicated.
- Routing is TanStack Router file routes (the brief's react-router-dom/react-helmet were mapped to file routes + route `head()` via `lib/seo.ts`); treatment pages share one `dental-treatments.$slug.tsx` route fed by data.
- All internal/external links go through `AppLink`/`Btn`, which add target/rel for http(s) links automatically.
- Typography utilities are named `type-h1/2/3` (not `text-*`) so tailwind-merge does not drop them next to text colour classes.
- Animations use framer-motion with reduced-motion guards; anything that checks "in view" must observe an unclipped element (clip-path targets never intersect).
- In-page section tabs use `useSectionSpy` (IntersectionObserver against a line under the sticky bar, click pins the tab during the scroll); programmatic scrolling goes through `lib/smooth-scroll.ts` so it cooperates with Lenis.
- Opening-hours logic (open-now, today's hours) always uses the practice timezone from `data/hours.ts`, never the visitor's.
- Time-dependent UI (open-now badge, today highlight) renders after mount to avoid SSR hydration mismatches.
- The feedback form has no backend: `submitFeedback()` in `lib/forms.ts` opens a prefilled email; replace that function to add a real endpoint.
- Netlify deploys use `@netlify/vite-plugin-tanstack-start`, enabled in `vite.config.ts` only when `NETLIFY=true` (with Lovable's Nitro step turned off there); Lovable preview/publish keep the built-in Nitro adapter, because two deploy adapters conflict and the Netlify dev middleware would break the preview.
