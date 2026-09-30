# SPEC 02 — Gestión de niños: listado y perfil (plantillas `ninos.dc.html` y `perfil-nino.dc.html`)

> **Estado:** Aprobado
> **Depende de:** SPEC 01
> **Fecha:** 2026-09-29
> **Objetivo:** Implementar el listado `/kids` y el perfil `/kids/[id]` con la interfaz estática de los mockups, reutilizando la navegación de SPEC 01 y sin backend.

## Scope

**Incluye:**

- Ruta `/kids` (`app/kids/page.tsx`) que replica el listado de `ninos.dc.html`: encabezado "GESTIÓN" / "Niños", botón "Agregar niño", buscador y bloque "SALA SOLES · 8 niños" con línea divisoria.
- Grid de 2 columnas con los 8 niños del mockup: avatar circular con inicial, nombre, "{edad} años · {n} padre(s) vinculados" y, cuando aplica, etiqueta a la derecha (MANÍ, LACTOSA, VINCULAR) o chevron.
- Ruta `/kids/[id]` (`app/kids/[id]/page.tsx`) que replica `perfil-nino.dc.html` para el niño con `id` `"1"`.
- Componentes nuevos en `components/kids/`: `KidCard`, `KidAvatar`, `KidsHeader`, `KidSearchField`, `ProfileHeader`, `AllergyAlert`, `KidDetails`, `LinkedParents`, `DailySummaryButton`.
- Datos mock tipados en `lib/kids-data.ts` (8 niños + 1 perfil completo).
- Navegación: "Niños" del sidebar y del drawer móvil apunta a `/kids` y queda activo tanto en `/kids` como en `/kids/1`; la marca y el resto de ítems siguen en `href="#"`; "Feed" sigue activo en `/`.
- Enlace "Volver a Niños" del perfil que lleva a `/kids`.
- Responsive básico: el grid pasa a 1 columna por debajo de `sm`; el perfil apila la columna lateral bajo la principal por debajo de `lg`; `Sidebar` y `MobileNav` se reutilizan tal cual de SPEC 01.
- Copy visible en español, calcada del mockup; identificadores, tipos, rutas y nombres de archivo en inglés.

**Fuera de alcance (para futuras specs):**

- Autenticación, sesiones, base de datos, API o persistencia de cualquier tipo.
- Filtrado real del buscador: el input es visual y no escribe ni filtra nada.
- Acciones reales: "Agregar niño", "Editar", "Resumen del día" y "Vincular otro padre" son estáticas (`href="#"`).
- Perfiles detallados de los 7 niños distintos de Mateo: solo la tarjeta de Mateo navega a `/kids/1`; las otras 7 se ven pero no son enlaces.
- Páginas destino de esas acciones: crear publicación, login, avisos, mi cuenta, agregar niño, resumen del día y vincular padre.
- Route group / layout compartido entre `/` y `/kids` (la duplicación de la estructura de shell se resuelve cuando exista la tercera pantalla).
- Pulido de estados de carga, vacío y responsive de detalle.

## Data model

Nomenclatura: identificadores, tipos, campos y funciones en inglés según las reglas de `AGENTS.md`. El español queda reservado al copy visible. No hay persistencia: todo son constantes en memoria.

```ts
// lib/kids-data.ts

export type AvatarTone = "sky" | "pink" | "green" | "yellow" | "purple";

export interface Kid {
  id: string; // "1" … "8"; se compara con el parámetro de ruta
  name: string; // "Mateo Fernández"
  age: number; // 2 | 3
  linkedParentCount: number; // 0 | 1 | 2
  avatarInitial: string; // "M"
  avatarTone: AvatarTone;
  badge?: { label: string; tone: "allergy" | "link" }; // "MANÍ" | "LACTOSA" | "VINCULAR"
}

export type ParentStatus = "active" | "pending";

export interface LinkedParent {
  name: string; // "Lucía Fernández"
  relationship: string; // "Mamá"
  status: ParentStatus;
  avatarInitial: string;
  avatarTone: AvatarTone;
  statusLabel: string; // "activa" | "invitación enviada"
}

export interface KidProfile {
  kidId: string; // "1"
  birthDate: string; // "12 mar 2022"
  room: string; // "Soles"
  admissionDate: string; // "feb 2025"
  allergiesTitle: string; // "Alergias y notas"
  allergiesNote: string; // "Alergia al maní. Evitar frutos secos. Lleva inhalador en la mochila."
  parents: LinkedParent[];
}

export const kids: Kid[] = [ /* los 8 del mockup, mismo orden */ ];
export const kidProfiles: KidProfile[] = [ /* solo Mateo (id "1") */ ];
```

Convenciones:

- `KidCard` recibe `kid: Kid` y una prop `href?: string`; si falta, renderiza un `<div>` equivalente con los mismos estilos (mismo look, sin navegación).
- El subtítulo "{edad} años · {n} padre(s) vinculados" se compone en el componente; el plural de "padre" se resuelve a "padres" cuando `linkedParentCount > 1`, y el mockup usa "sin padres vinculados" cuando vale `0`.
- Los tokens de color nuevos que el listado y el perfil necesitan y que todavía no existen en `app/globals.css`: tonos de avatar (`pink`, `green`, `yellow`, `purple` y sus inks), badge de alergia/link, badge de estado de padre (`active`, `pending`) y los de la alerta (`#FBDAD6` / `#F4A8A0` / `#C5413A` / `#B25249`). Se añaden a `@theme` en el paso 3, no se escriben hex sueltos en los componentes.
- El mapeo interno → copy visible (`ParentStatus` → "ACTIVA" / "PENDIENTE", `AvatarTone` → clases, `KidBadgeTone` → clases) vive junto al componente que lo usa, igual que en SPEC 01.
- El copy del encabezado del perfil ("{edad} años · Sala {sala}") se compone en `ProfileHeader` a partir de `Kid` + `KidProfile`.

## Implementation plan

1. `app/globals.css`: añadir a `@theme` los tokens de tonos de avatar, badges de etiqueta y de estado de padre, y los de la alerta de alergias que usan los mockups. No se tocan los tokens de SPEC 01. Manual test: `npm run dev` sigue mostrando el feed igual.
2. `lib/kids-data.ts`: tipos en inglés + `kids` con los 8 registros en el orden del mockup (nombre, edad, vínculos, inicial, tono y etiqueta opcional) y `kidProfiles` con el único perfil de Mateo. Sin datos inventados.
3. `components/feed/sidebar.tsx` y `components/feed/mobile-nav.tsx`: `NavLinks` recibe `activeNav: "feed" | "kids"` (valor por defecto `"feed"`), el ítem "Niños" pasa a `href="/kids"` y `Sidebar`/`MobileNav` reenvían la prop. `app/page.tsx` sigue sin pasar la prop, por lo que conserva "Feed" activo. Manual test: `/` no cambia visualmente y el drawer móvil mantiene su comportamiento.
4. `components/kids/kid-avatar.tsx` y `components/kids/kid-card.tsx`: avatar circular con inicial y tone; tarjeta con hover (`translateY(-2px)` + borde `#F2A78E`), chevron cuando no hay etiqueta y `href` opcional. Manual test: render de prueba en `/kids` con los 8.
5. `app/kids/page.tsx`: sidebar + mobile-nav, `main` con contenedor `max-w-[880px]`, encabezado con "GESTIÓN"/"Niños" y botón "Agregar niño", buscador, bloque "SALA SOLES · 8 niños" y grid `grid-cols-1 sm:grid-cols-2`. Solo la tarjeta con `id` `"1"` recibe `href="/kids/1"`.
6. `components/kids/profile-header.tsx`, `allergy-alert.tsx`, `kid-details.tsx`, `linked-parents.tsx`, `daily-summary-button.tsx` + `app/kids/[id]/page.tsx`: enlace "Volver a Niños" a `/kids`, layout de dos columnas (`max-w-[820px]`, columna principal flexible y lateral de 300px que se apila bajo `lg`), y `notFound()` de Next.js cuando `params.id` no es `"1"`.
7. Verificación de fidelidad: comparar ambas rutas lado a lado con sus mockups en escritorio y a 375px (capturas en `.playwright-mcp/`), y cerrar con `npm run lint` y `npx tsc --noEmit`.

Cada paso deja la aplicación compilable y visible en `npm run dev`.

## Acceptance criteria

- [ ] `/kids` muestra los 8 niños del mockup, en el mismo orden, con nombre, "{edad} años · {vínculos}", inicial, tono de avatar y etiquetas MANÍ / LACTOSA / VINCULAR donde corresponde.
- [ ] El listado se ve idéntico a `ninos.dc.html` en escritorio: ancho máximo 880px, grid de 2 columnas, encabezado, buscador y bloque de sala.
- [ ] `/kids/1` muestra el perfil de Mateo con avatar de 84px, título, "3 años · Sala Soles", botón "Editar", alerta de alergias, tabla de 3 filas y tarjeta de padres con los estados ACTIVA y PENDIENTE.
- [ ] `/kids/1` y `/kids/2` (o cualquier id distinto de `"1"`) devuelven la página 404 de Next.js; ninguna tarjeta muestra un perfil inventado.
- [ ] El enlace "Niños" del sidebar y del drawer lleva a `/kids` y aparece activo en `/kids` y en `/kids/1`; en `/` sigue activo "Feed".
- [ ] Solo la tarjeta de Mateo es navegable: al pulsarla se llega a `/kids/1`; las otras 7 no cambian la URL ni disparan errores.
- [ ] El enlace "Volver a Niños" del perfil lleva a `/kids`.
- [ ] En ≤ 640px el grid pasa a 1 columna y la columna lateral del perfil queda debajo de la principal; en ≥ 1024px el sidebar queda fijo y la barra móvil oculta, igual que en SPEC 01.
- [ ] El buscador acepta foco y muestra el placeholder "Buscar niño…" pero la lista no cambia al escribir.
- [ ] "Agregar niño", "Editar", "Resumen del día" y "Vincular otro padre" no navegan y no ejecutan ninguna acción.
- [ ] Fredoka y Nunito siguen cargándose por `next/font`; no hay errores ni warnings en la consola al visitar `/`, `/kids` y `/kids/1`.
- [ ] `npm run lint` y `npx tsc --noEmit` terminan con exit code 0.
- [ ] Todos los identificadores del código (tipos, campos, componentes, variables, rutas, nombres de archivo) están en inglés; solo el texto renderizado está en español.

## Decisiones

- **Sí:** rutas en inglés (`/kids`, `/kids/[id]`) con copy en español — decisión explícita del usuario; el mockup se llama `ninos.dc.html` pero el proyecto separa código y UI.
- **Sí:** identificador numérico como cadena (`"1"`…`"8"`) en lugar de slug — decisión explícita del usuario; más simple para datos mock y permite comparar directamente contra el parámetro de ruta.
- **Sí:** solo Mateo navega a su perfil — la referencia solo aporta datos completos de un niño; inventar alergias, fechas y familiares para los otros 7 sería contenido falso en una app de guardería.
- **Sí:** `notFound()` de Next.js para ids desconocidos — comportamiento nativo del App Router, sin UI extra que mantener.
- **Sí:** `href` opcional en `KidCard` en lugar de dos componentes — un solo camino de estilo para tarjetas navegables y no navegables.
- **Sí:** reutilizar `Sidebar` y `MobileNav` con una prop `activeNav` — evita duplicar la navegación y mantiene el comportamiento del drawer ya verificado en SPEC 01.
- **Sí:** el valor por defecto de `activeNav` es `"feed"` — SPEC 01 no tiene que cambiar su llamada; la ruta `/` sigue siendo la de Feed.
- **Sí:** tokens de color nuevos en `@theme` — los avatares y badges del listado usan tonos que el feed no necesita; se agregan al sistema en vez de repetir hex en los componentes.
- **No:** búsqueda funcional — el alcance es UI estática; el filtrado en memoria es trivial pero trivial también es su valor ahora.
- **No:** layout compartido (route group) para `/` y `/kids` — con dos pantallas la duplicación es tolerable; el layout entra con la tercera pantalla o con la spec de autenticación.
- **No:** mover `Sidebar`/`MobileNav` a `components/layout/` — renombrar archivos de una spec ya implementada y verificada agrega ruido al diff; si más adelante los reubicamos, será dentro del refactor del layout.
- **No:** librería de íconos — los SVG se copian del mockup, como en SPEC 01.
- **No:** `app/not-found.tsx` con el diseño de la app — la 404 por defecto de Next.js cumple; designingla es otra spec.

## Riesgos

| Riesgo                                                                              | Mitigación                                                                                        |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| El `overflow-y:auto` del `main` de los mockups difiere del scroll natural de la app | Mismo criterio aceptado en SPEC 01: se deja el scroll natural de la página                        |
| `notFound()` en una ruta estática puede cachearse o redirigir mal en dev            | Verificar `/kids/1` y `/kids/2` en `npm run dev` y en `npm run build` antes de cerrar la spec   |
| Deriva de espaciados al pasar de estilos inline a clases Tailwind                    | Comparación visual de ambos mockups en el paso 7 con capturas lado a lado                        |
| Reutilizar `Sidebar`/`MobileNav` puede romper el feed ya verificado                   | El cambio es backward compatible (`activeNav` con valor por defecto) y se revisa `/` en el paso 3 |

## Lo que **no** va en esta spec

- Backend, autenticación, sesiones o persistencia.
- Búsqueda funcional.
- Acciones de agregar, editar, resumen del día o vincular padres.
- Perfiles de los 7 niños distintos de Mateo.
- Páginas de crear publicación, login, avisos, mi cuenta, agregar niño, resumen del día o vincular padre.
- Layout compartido entre rutas (route group).
- Diseño de la página 404 con la identidad de la app.

Cada uno de esos, si llega, va en su propia spec.
