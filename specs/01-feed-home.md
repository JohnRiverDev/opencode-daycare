# SPEC 01 — Home: Feed de la guardería (plantilla `feed.dc.html`)

> **Estado:** Aprobado
> **Depende de:** ninguna
> **Fecha:** 2026-09-28
> **Objetivo:** Implementar la ruta `/` como copia fiel del mockup `references/pantallas/feed.dc.html`, con sidebar, composer y 3 publicaciones de ejemplo, usando datos estáticos sin autenticación ni base de datos.

## Scope

**Incluye:**

- Página `/` (`app/page.tsx`) que replica el feed del mockup.
- Sidebar: logo OpenDayCare / Sala Soles, botón "Nueva publicación", navegación (Feed activo, Niños, Avisos, Mi cuenta) y tarjeta de usuario (Caro Giménez, Maestra · Soles) con botón de cerrar sesión.
- Encabezado: "GUARDERÍA · SALA SOLES", "Buenas, Caro", "12 niños · martes 17 jun" (copy 100% estático, tal cual del mockup).
- Composer "Compartí un momento…" con avatar e ícono de cámara.
- 3 tarjetas de publicación: LOGRO (Mateo 14:20), ACTIVIDAD (Mateo 09:40, con placeholder de foto dashed) y ANUNCIO (Anuncio general 07:50), con contador de likes, comentarios y enlace "Editar".
- Sección "PUBLICADO HOY" con línea divisoria.
- Paleta y tipografías: tokens de color en `@theme` de `app/globals.css`; fuentes Fredoka + Nunito vía `next/font` en `app/layout.tsx` (Geist se elimina).
- Idiomas: código interno (tipos, campos, componentes, variables) en inglés; toda la copy visible en pantalla en español, calcada del mockup.
- Responsive básico: en `<lg` el sidebar se oculta y aparece una barra superior con logo + hamburguesa que abre un drawer con overlay (componente cliente).
- Íconos SVG copiados del mockup (inline, sin librería de íconos).

**Fuera de alcance (para futuras specs):**

- Autenticación, sesiones, cierre de sesión real.
- Base de datos / API / persistencia de ningún tipo.
- Páginas destino (login, crear publicación, niños, avisos, mi cuenta, detalle, foto): todos los enlaces usan `href="#"`.
- Interacción: likes, comentarios y composer no hacen nada (solo hover/focus visuales).
- Responsive completo y pulido (el drawer es lo mínimo funcional; el detalle mobile merece su propia pasada).

## Data model

Nomenclatura: todo el código interno (tipos, campos, variables, funciones, nombres de archivo) en inglés, según las reglas de clean code de `AGENTS.md`. El español queda reservado exclusivamente al copy visible en pantalla (valores de los datos y textos hardcodeados).

```ts
// lib/feed-data.ts
export type PostType = "achievement" | "activity" | "announcement";

export interface FeedPost {
  id: string;
  author: string; // "Mateo" | "Anuncio general" (copy visible → español)
  avatarInitials?: string; // "M"; si no, avatar con ícono (anuncio)
  time: string; // "14:20 · publicado por vos"
  audience: string; // "familia de Mateo" | "toda la sala"
  body: string;
  photoCaption?: string; // leyenda del placeholder de foto
  likes: number;
  comments: number;
  type: PostType;
}

export const posts: FeedPost[] = [
  /* los 3 posts del mockup, con el texto exacto en español */
];
```

Etiquetas visibles de badge (mapeo interno → UI, en `PostCard`): `achievement` → "LOGRO", `activity` → "ACTIVIDAD", `announcement` → "ANUNCIO".

Convenciones:

- El mapa de estilo por tipo (`achievement` verde `#3E9B6C` / `CFEBD8`, `activity` azul `#2E89A6` / `C7E7F1`, `announcement` índigo `#4E72C8` / `CCD8F4`) vive junto al `PostCard` o en `lib/feed-data.ts`.
- El contenido del sidebar (nombre de usuario, ítems de navegación) queda hardcodeado en el componente; no forma parte de `feed-data.ts`.
- Componentes y props también en inglés: `<PostCard post={...}>`, `<Sidebar />`, `<MobileNav />`, `PostComposer`.

## Implementation plan

1. `app/layout.tsx`: reemplazar Geist por `Fredoka` (variable `--font-display`) y `Nunito` (variable `--font-sans`) de `next/font/google`; `lang="es"`; metadata `{ title: "OpenDayCare" }`.
2. `app/globals.css`: definir en `@theme` los tokens de la paleta (`--color-cream: #F6ECDF`, `--color-card: #FFFDF9`, `--color-edge: #ECE0D0`, `--color-ink: #3F362E`, `--color-muted: #A89A8B`, `--color-subtle: #94887B`, `--color-accent: #D9583C`, `--color-accent-soft: #FBE3D8`, `--color-flame: #F2937A`, `--color-flame-deep: #EE8164`, colores de badge) y las fuentes; aplicar `bg-cream` / `text-ink` al `body`; eliminar el bloque `prefers-color-scheme` oscuro y las variables `--background` / `--foreground`.
3. `lib/feed-data.ts`: tipos en inglés + array de los 3 posts con el texto visible exacto del mockup (español).
4. `components/feed/post-card.tsx`: tarjeta que recibe `FeedPost` y renderiza badge (mapeo `type` → etiqueta española), avatar, "Para:", texto, placeholder de foto opcional y footer con likes / comentarios / Editar.
5. `components/feed/sidebar.tsx`: aside desktop (sticky, `hidden lg:flex`) con logo, botón "Nueva publicación", nav, y tarjeta de usuario.
6. `components/feed/mobile-nav.tsx` (`"use client"`): barra superior `lg:hidden` con logo + hamburguesa, estado abierto/cerrado y drawer con overlay que reutiliza los ítems de navegación del sidebar.
7. `app/page.tsx`: composición — sidebar + mobile-nav, `main` centrado `max-w-[760px]`, encabezado, composer (`<a href="#">`), divisor "PUBLICADO HOY" y `posts.map(PostCard)`.
8. Ajustes finales de fidelidad: sombras (equivalentes a `0 4px 16px -12px rgba(120,90,60,.5)`), radios, scrollbar del mockup, y verificación visual lado a lado contra `feed.dc.html`.

Cada paso deja la aplicación compilable y visible en `npm run dev`.

## Acceptance criteria

- [ ] `npm run dev` muestra en `http://localhost:3000` el feed con el mismo layout, colores, textos y tipografías que `feed.dc.html` (comparación visual lado a lado).
- [ ] Fredoka y Nunito se cargan vía `next/font` (sin `<link>` a Google Fonts) y no hay errores ni warnings de fuentes/hidratación en la consola.
- [ ] Se renderizan las 3 tarjetas con sus badges LOGRO / ACTIVIDAD / ANUNCIO, y la de ACTIVIDAD incluye el placeholder de foto dashed.
- [ ] Todos los enlaces y botones usan `href="#"`; ningún click navega ni genera errores en consola.
- [ ] En viewport ≤ 768px el sidebar desaparece y la barra superior con hamburguesa abre/cierra el drawer con overlay; en ≥ 1024px el sidebar queda fijo como en el mockup.
- [ ] `npm run lint` y `npx tsc --noEmit` pasan sin errores.
- [ ] Todos los identificadores del código (tipos, campos, componentes, variables, nombres de archivo) están en inglés; solo el texto renderizado en pantalla está en español.

## Decisiones

- **Sí:** código interno en inglés y copy visible en español — regla de clean code de `AGENTS.md`; el español es idioma de UI, no de código.
- **Sí:** valores de `PostType` en inglés (`achievement`/`activity`/`announcement`) con mapeo a etiquetas españolas en el badge — evita strings de dominio mezclados con la lógica.
- **Sí:** datos mock tipados en `lib/feed-data.ts` — reemplazables luego por la fuente real sin tocar los componentes.
- **Sí:** sidebar renderizado por la página `/` (sin route group todavía) — la estructura compartida se decidirá con la spec de navegación/autenticación.
- **Sí:** drawer con hamburguesa en mobile (`"use client"`) — único componente cliente de esta spec.
- **Sí:** tokens de color en `@theme` de Tailwind v4 — consistencia para las specs de las demás pantallas.
- **No:** librería de íconos (lucide, etc.) — los SVG del mockup se copian inline, cero dependencias nuevas.
- **No:** rutas reales `/ninos`, `/avisos`… — devolverían 404 hasta sus specs; se usa `href="#"`.
- **No:** fecha dinámica en el encabezado — copy 100% estático del mockup.
- **No:** dark mode (se eliminan las variables de la plantilla por defecto) — el mockup es solo claro.

## Riesgos

| Riesgo                                                              | Mitigación                                                   |
| ------------------------------------------------------------------- | ------------------------------------------------------------ |
| El `overflow-y:auto` del `main` del mockup (scroll interno) difiere | Dejar el scroll natural de la página; visualmente idéntico   |
| Deriva de espaciados al pasar de estilos inline a Tailwind          | Comparación visual al final (paso 8) y ajuste fino de tokens |

## Lo que **no** va en esta spec

- Autenticación y base de datos.
- Páginas: login, crear publicación, niños, avisos, mi cuenta, detalle de publicación, foto.
- Interacción real (likes, comentarios, composer).
- Diseño mobile pulido.

Cada uno de esos, si llega, va en su propia spec.
