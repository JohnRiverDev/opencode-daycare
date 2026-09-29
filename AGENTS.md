<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know
##
This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


## Stack (verified from package.json / configs)

- Next.js 16.3.6 (App Router, `app/` only — no `src/`), React 19.2, TypeScript strict.
- Tailwind CSS **v4**: no `tailwind.config.*` file exists. Theme customization goes in `app/globals.css` via `@theme` (CSS-first config).
- Path alias `@/*` maps to the repo root (e.g. `@/app/...`).
- ESLint 9 flat config (`eslint.config.mjs`) with `eslint-config-next` core-web-vitals + typescript presets.

## Commands

- `npm run dev` — dev server on http://localhost:3000
- `npm run lint` — runs plain `eslint` (no `next lint`, no typecheck step)
- No test framework is installed yet. For typechecking use `npx tsc --noEmit`.
- Single-package repo: no workspaces, no build codegen, no migrations.

## Spec-driven workflow

- Features are designed with the `/spec` skill and implemented with `/spec-impl` (see `.agents/skills/`). Specs live in `specs/NN-slug.md` (zero-padded numbers); `/spec-impl` expects state `Approved` and creates a branch named `spec-NN-slug`.
- `specs/` does not exist yet — the first `/spec` run creates it (and seeds `specs/.spec-config.yml`).

## Design references

- `references/pantallas/*.dc.html` are static HTML mockups of the app screens (in Spanish: login, feed, niños, publicar, avisos, etc.) plus `references/screenshots/*.png`. Use them as the UI source of truth when implementing screens; the app's user-facing copy is in Spanish.
- Mockups use Google Fonts **Fredoka** and **Nunito** — load via `next/font` rather than `<link>` tags in the real app.

## MCPs

- PlayWright: Todo lo creado por este mcp debe quedar almacenado en la carpeta .playwright-mcp (Screenshots por ejemplo)
- Context7: Utilizaremos este mcp para traer la documentación actualizada del framework.

## Spec Driven Development  - Skills
- /spec: Usaremos esta skill para crear las especificacione.
- /spec-impl: Usaremos esta skill para implementar las especificaciones.

## Reglas de código
- Usar código limpio: nombres, variables, funciones, etc., en inglés.

## Agents
- spec-verifier: Verifica, corrige y marca los criterios de aceptación ("Acceptance criteria") de un spec. Usa Context7 para validar las recomendaciones de Next.js y el MCP de Playwright con visión para comparar pantallas contra los mockups.