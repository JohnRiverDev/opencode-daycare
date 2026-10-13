# SPEC 05 — Modal de crear publicación

> **Estado:** Approved
> **Depende de:** SPEC 01, SPEC 03
> **Fecha:** 2026-10-12
> **Objetivo:** Implementar un modal accesible sobre `/` para crear una nueva publicación con selector de niños, tipo, descripción y fotos, reutilizando el `<Modal>` de SPEC 03.

## Scope

**Incluye:**

- Componente modal accesible sobre `/`, reutilizando `<Modal>` de SPEC 03.
- Apertura del modal desde el botón "Nueva publicación" del sidebar del feed (convertir de `<a href="#">` a `<button>`).
- El composer "Compartí un momento…" del feed **no** abre el modal (se mantiene como elemento visual estático, sin interacción).
- Cierre del modal con:
  - Botón "Cancelar" (esquina superior izquierda del header).
  - Tecla Escape.
- Header custom con:
  - "Cancelar" a la izquierda (color `#94887B`, font-weight 700, 15px).
  - "Nueva publicación" centrado (Fredoka, font-weight 600, 18px).
  - "Publicar" a la derecha (color `#D9583C`, font-weight 800, 15px).
- Sección **PARA** con selector de niños tipo pill:
  - Pills con avatar circular (inicial + color), nombre del niño y borde.
  - Estado seleccionado: fondo `#3F362E`, texto blanco, borde `#3F362E`.
  - Estado no seleccionado: fondo `#FFFDF9`, texto `#6E6359`, borde `#ECE0D0`.
  - Opción "Toda la sala" (sin avatar, solo texto).
  - Selección múltiple: se pueden seleccionar varios niños simultáneamente, o "Toda la sala" (excluyente entre "Toda la sala" y niños individuales).
  - Niños hardcodeados: Mateo (M, `#A9D9E8`/`#1F7A93`), Sofía (S, `#F4B8CC`/`#C44A7A`), Benjamín (B, `#B9DEC4`/`#3E8B62`).
- Sección **TIPO** con selector tipo pill (selección simple):
  - 7 tipos: Comida, Siesta, Actividad, Logro, Ánimo, Foto, Anuncio.
  - Cada tipo con su color de fondo y texto (calcados del mockup).
  - Estado seleccionado: indicador visual adicional (sombra o escala sutil).
- Sección **DESCRIPCIÓN** con textarea:
  - Placeholder: "Contá cómo le fue hoy…".
  - Estilo: border `#EADFD0`, background `#fff`, rounded-[14px], min-height 120px, resize vertical.
- Sección **FOTOS** con:
  - Thumbnail de foto existente (96×96, rounded-[14px], fondo `#F4ECE1`, borde `#ECE0D0`, ícono de imagen).
  - Botón "Agregar" (96×96, rounded-[14px], borde dashed `#DBCDBA`, fondo `#F4ECE1`, ícono "+" naranja `#C5503A`, texto "Agregar" 12px).
  - Solo UI de selección: el botón "Agregar" abre un `<input type="file" accept="image/*">` y muestra la imagen seleccionada como thumbnail. No se sube a ningún servicio.
- Validación visual al presionar "Publicar":
  - Si no se seleccionó ningún niño ni "Toda la sala": indicador visual en la sección PARA.
  - Si no se seleccionó ningún tipo: indicador visual en la sección TIPO.
  - Si la descripción está vacía: borde rojo (`border-alert-icon`) en el textarea.
- Al presionar "Publicar" con todo válido: se agrega la publicación al array de posts en estado local y se cierra el modal.
- Reset del formulario al cerrar el modal (deselección de niños, tipo, descripción vacía, fotos limpiadas).
- Accesibilidad completa: foco trap, `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, foco al primer elemento enfocable al abrir, foco vuelve al disparador al cerrar.
- Nuevos tokens de color en `app/globals.css` para los tipos de publicación faltantes (Comida, Siesta, Ánimo, Foto).
- Estado local de publicaciones: array de posts en un componente cliente que envuelve el feed, compartido entre `PostComposer` y la lista de posts.
- Copy visible en español; identificadores en inglés.

**Fuera de alcance (para futuras specs):**

- Persistencia de datos (localStorage, backend, API).
- Subida real de fotos a un servicio de storage.
- Edición o eliminación de publicaciones.
- Likes, comentarios y otras interacciones sobre las publicaciones nuevas.
- Validación de longitud mínima de la descripción (solo se valida que no esté vacía).
- Preview de la publicación antes de publicar.
- Programación de publicaciones.
- Notificaciones a padres.
- Integración con autenticación o permisos de usuario.
- Animaciones de entrada/salida.

## Data model

```ts
// lib/feed-data.ts (extensiones)

export type PostType =
  | "meal"        // Comida
  | "nap"         // Siesta
  | "activity"    // Actividad (ya existe)
  | "achievement" // Logro (ya existe)
  | "mood"        // Ánimo
  | "photo"       // Foto
  | "announcement"; // Anuncio (ya existe)

// Nuevas propiedades en FeedPost:
export interface FeedPost {
  // ... campos existentes ...
  targetChildIds: string[];    // nuevo: [] si isForAll es true
  isForAll: boolean;           // nuevo: true si "Toda la sala"
  photoDataUrls: string[];     // nuevo: data URLs locales, opcional
}
```

Niños disponibles para selección:

```ts
// lib/kids-data.ts (adición)

export interface KidOption {
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  avatarInk: string;
}

export const postableKids: KidOption[] = [
  { id: "mateo", name: "Mateo", initials: "M", avatarBg: "#A9D9E8", avatarInk: "#1F7A93" },
  { id: "sofia", name: "Sofía", initials: "S", avatarBg: "#F4B8CC", avatarInk: "#C44A7A" },
  { id: "benjamin", name: "Benjamín", initials: "B", avatarBg: "#B9DEC4", avatarInk: "#3E8B62" },
];
```

Los posts existentes (post-1, post-2, post-3) se actualizan para cumplir la nueva interfaz (post-1 y post-2 tienen `targetChildIds: ["mateo"]`, post-3 tiene `isForAll: true`).

## Implementation plan

1. **`lib/feed-data.ts`**: extender `PostType` con los 4 nuevos valores (`meal`, `nap`, `mood`, `photo`). Agregar campos `targetChildIds`, `isForAll`, `photoDataUrls` a `FeedPost`. Actualizar los 3 posts existentes. Agregar entradas en `postTypeBadge` para los 4 nuevos tipos. Manual test: `npm run dev` sigue mostrando el feed igual.

2. **`lib/kids-data.ts`**: agregar interfaz `KidOption` y constante `postableKids` con los 3 niños del mockup. No se tocan las interfaces existentes. Manual test: `npm run dev` sigue mostrando todo igual.

3. **`app/globals.css`**: agregar tokens de color para los tipos faltantes. Revisar si tokens existentes (`--color-yellow`/`--color-yellow-ink` para Comida, `--color-purple`/`--color-purple-ink` para Siesta, `--color-link`/`--color-link-ink` para Ánimo, `--color-allergy`/`--color-allergy-ink` para Foto) ya cubren estos colores; si es así, mapear directamente en `postTypeBadge` sin crear duplicados. Manual test: `npm run dev` sin cambios visuales.

4. **`components/feed/create-post-modal.tsx`** (`"use client"`): componente del modal. Props: `open`, `onClose`, `onPublish`. Usa `<Modal>` de SPEC 03. Header custom con tres botones (Cancelar/Nueva publicación/Publicar). Estado interno: `selectedChildIds`, `isForAll`, `selectedType`, `description`, `photoDataUrls`, `errors`. Lógica: click en niño lo agrega/quita y deselecciona "Toda la sala"; click en "Toda la sala" limpia `selectedChildIds`. Al "Publicar": validar targets, tipo y descripción; si hay errores marcar indicadores; si es válido llamar `onPublish` y cerrar. Reset al cerrar. Estilos calcados del mockup.

5. **`app/page.tsx`**: convertir en cliente (o wrapper cliente). Agregar estado `isCreatePostModalOpen` y `localPosts` (inicializado con posts de `feed-data.ts`). Conectar `NewPostButton` del sidebar con apertura del modal. Renderizar `<CreatePostModal>`. `onPublish` genera post con `id: "post-${Date.now()}"`, hora actual formateada, `likes: 0`, `comments: 0`, y agrega a `localPosts`.

6. **`components/feed/sidebar.tsx`**: modificar `NewPostButton` para aceptar prop `onClick?: () => void` y convertir `<a href="#">` en `<button>`. Si no se pasa `onClick`, no hace nada (backward compatible). Manual test: el botón se ve igual.

7. **Verificación final**: comparar con mockup en escritorio y 375px (capturas en `.playwright-mcp/`), `npm run lint` y `npx tsc --noEmit`.

## Acceptance criteria

- [ ] El botón "Nueva publicación" del sidebar abre el modal al hacer click.
- [ ] El modal muestra el header con "Cancelar" a la izquierda, "Nueva publicación" centrado, "Publicar" a la derecha.
- [ ] El modal se cierra con el botón "Cancelar".
- [ ] El modal se cierra con la tecla Escape.
- [ ] La sección PARA muestra 3 niños (Mateo, Sofía, Benjamín) con sus avatares circulares y colores.
- [ ] La sección PARA muestra la opción "Toda la sala".
- [ ] Al seleccionar un niño, el pill muestra el estilo seleccionado (fondo `#3F362E`, texto blanco).
- [ ] Se pueden seleccionar múltiples niños simultáneamente.
- [ ] Al seleccionar "Toda la sala", se deseleccionan los niños individuales.
- [ ] Al seleccionar un niño individual, se deselecciona "Toda la sala".
- [ ] La sección TIPO muestra 7 tipos: Comida, Siesta, Actividad, Logro, Ánimo, Foto, Anuncio.
- [ ] Cada tipo tiene su color de fondo y texto calcado del mockup.
- [ ] Al seleccionar un tipo, el pill muestra el estilo seleccionado.
- [ ] Solo se puede seleccionar un tipo a la vez.
- [ ] La sección DESCRIPCIÓN muestra un textarea con placeholder "Contá cómo le fue hoy…".
- [ ] La sección FOTOS muestra un thumbnail y un botón "Agregar" con borde dashed.
- [ ] El botón "Agregar" abre un input de archivo y muestra la imagen seleccionada como thumbnail.
- [ ] Al presionar "Publicar" sin seleccionar ningún target, se muestra indicador visual de error en la sección PARA.
- [ ] Al presionar "Publicar" sin seleccionar ningún tipo, se muestra indicador visual de error en la sección TIPO.
- [ ] Al presionar "Publicar" con la descripción vacía, se muestra borde rojo en el textarea.
- [ ] Al presionar "Publicar" con todos los campos válidos, la publicación se agrega al feed y el modal se cierra.
- [ ] La publicación nueva aparece en el feed con el tipo, descripción y fotos correctos.
- [ ] Al cerrar el modal, todos los campos se resetean (niños deseleccionados, tipo deseleccionado, descripción vacía, fotos limpiadas, errores limpiados).
- [ ] El modal tiene foco trap (Tab/Shift+Tab no sale del modal).
- [ ] El modal tiene `role="dialog"`, `aria-modal="true"`, `aria-labelledby`.
- [ ] Al abrirse, el foco va al primer elemento enfocable del modal.
- [ ] Al cerrarse, el foco vuelve al botón "Nueva publicación" del sidebar.
- [ ] En < 640px el modal se adapta (fullscreen o scroll interno).
- [ ] El modal replica visualmente `crear-publicacion.dc.html`.
- [ ] `npm run lint` y `npx tsc --noEmit` terminan con exit code 0.
- [ ] No hay errores en la consola del browser.

## Decisiones

- **Sí:** reutilizar el `<Modal>` de SPEC 03 — centraliza accesibilidad y evita duplicar foco trap y ARIA.
- **Sí:** header custom dentro del children — el mockup muestra un header con tres botones, diferente al de SPEC 03. No se modifica el componente base para no romper lo ya verificado.
- **Sí:** validación visual al publicar — indicadores visuales en campos obligatorios inválidos. Igual que SPEC 03 y SPEC 04.
- **Sí:** selección múltiple de niños — el mockup muestra varios niños con estilo seleccionado simultáneamente.
- **Sí:** "Toda la sala" excluyente con niños individuales — lógica estándar para este tipo de selectores.
- **Sí:** selección simple de tipo — solo un tipo por publicación.
- **Sí:** fotos opcionales — no se validan como obligatorias.
- **Sí:** data URLs para fotos — solo UI local, no se suben a ningún servicio. Confirmado por el usuario.
- **Sí:** estado local en `app/page.tsx` — sin persistencia. Confirmado por el usuario.
- **Sí:** conversión de `<a>` a `<button>` en el botón "Nueva publicación" del sidebar — semántica correcta para una acción, no navegación.
- **No:** apertura desde el composer "Compartí un momento…" — confirmado por el usuario (solo desde el botón del sidebar). El composer se mantiene como elemento visual estático.
- **Sí:** reset del formulario al cerrar — confirmado por el usuario.
- **Sí:** accesibilidad completa — confirmado por el usuario.
- **Sí:** niños hardcodeados en `lib/kids-data.ts` — Mateo, Sofía, Benjamín con colores del mockup.
- **No:** persistencia — confirmado por el usuario (puramente local).
- **No:** subida real de fotos — solo UI de selección con data URLs.
- **No:** edición o eliminación de publicaciones.
- **No:** validación de longitud mínima de descripción — solo que no esté vacía.
- **No:** preview de la publicación antes de publicar.
- **No:** animaciones de entrada/salida.

## Lo que **no** va en esta spec

- Persistencia de datos (localStorage, IndexedDB, backend, API).
- Subida real de fotos a un servicio de storage.
- Edición o eliminación de publicaciones.
- Likes, comentarios y otras interacciones sobre las publicaciones nuevas.
- Validación de longitud mínima de la descripción.
- Preview de la publicación antes de publicar.
- Programación de publicaciones.
- Notificaciones a padres.
- Integración con autenticación o permisos de usuario.
- Animaciones de entrada/salida del modal.

Cada uno de esos, si llega, va en su propia spec.
