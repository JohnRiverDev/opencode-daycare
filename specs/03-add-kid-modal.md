# SPEC 03 — Modal para agregar niño

> **Estado:** Accepted
> **Depende de:** SPEC 02
> **Fecha:** 2026-10-10
> **Objetivo:** Implementar un modal accesible sobre `/kids` para agregar niños visualmente, con validación de campos obligatorios y tres salas disponibles (Soles, Lunas, Estrellas).

## Scope

**Incluye:**

- Componente modal accesible sobre la página `/kids`, con foco trap, aria-labels y navegación por teclado completa.
- Apertura del modal con click en el botón "Agregar niño" del header de `/kids`.
- Cierre del modal con:
  - Botón "Cancelar" (esquina superior izquierda).
  - Tecla Escape.
- Formulario con cinco campos:
  - **Nombre completo** (input de texto, obligatorio, placeholder "Ej. Martina López").
  - **Fecha de nacimiento** (input de texto con formato `dd/mm/aaaa`, obligatorio).
  - **Sala** (dropdown/select con tres opciones: "Soles", "Lunas", "Estrellas", obligatorio, valor por defecto "Soles").
  - **Alergias (etiquetas)** (input de texto simple, opcional, placeholder "Ej. Maní, Lactosa").
  - **Notas médicas** (textarea, opcional, placeholder "Indicaciones, medicación, contactos…").
- Validación visual de campos obligatorios al intentar guardar (borde rojo en los campos vacíos).
- Botón "Guardar" que cierra el modal sin persistir datos.
- Reset del formulario al cerrar el modal.
- Comportamiento responsive: en pantallas pequeñas el modal se adapta (fullscreen o scroll interno).
- Accesibilidad completa: foco trap, `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, foco al primer elemento enfocable al abrir, foco vuelve al botón "Agregar niño" al cerrar.
- Constante `rooms` en `lib/kids-data.ts` con las tres salas.
- Copy visible en español; identificadores en inglés.

**Fuera de alcance (para futuras specs):**

- Persistencia de datos (el niño agregado no aparece en la lista).
- Perfiles de niños agregados mediante el modal.
- Edición o eliminación de niños.
- Upload de foto/avatar.
- Date picker custom (se usa input de texto con placeholder).
- Sistema de tags para alergias (input simple).
- Validación de formato de fecha.
- Animaciones de entrada/salida.

## Data model

```ts
// lib/kids-data.ts (nuevas adiciones)

export interface Room {
  id: string;     // "soles" | "lunas" | "estrellas"
  name: string;   // "Soles" | "Lunas" | "Estrellas"
}

export const rooms: Room[] = [
  { id: "soles", name: "Soles" },
  { id: "lunas", name: "Lunas" },
  { id: "estrellas", name: "Estrellas" },
];
```

No se introduce estructura de persistencia. El formulario usa estado interno (`useState`) en el componente del modal.

## Implementation plan

1. **`lib/kids-data.ts`**: agregar interfaz `Room` y constante `rooms` con las tres salas. No se tocan las interfaces existentes. Manual test: `npm run dev` sigue mostrando todo igual.

2. **`components/ui/modal.tsx`**: componente modal reutilizable. Props: `open`, `onClose`, `title`, `children`. Usa `<dialog>` nativo de HTML5 con focus trap, `aria-modal`, `aria-labelledby`. Cierra con Escape. Al abrir, foco al primer elemento enfocable; al cerrar, foco vuelve al disparador. Manual test: renderizar con contenido de prueba sobre `/kids`.

3. **`components/kids/add-kid-modal.tsx`**: componente del formulario. Estado interno con los cinco campos. Header con "Cancelar" (izquierda), "Agregar niño" (centro), "Guardar" (derecha). Layout de campos calcado del mockup (labels en mayúsculas, inputs con `rounded-[14px]`, fondo `bg-card`, borde `border-edge-soft`). Validación: al pulsar "Guardar", si nombre/fecha/sala están vacíos, se marca borde rojo (`border-alert-icon`) en esos campos. Al cerrar (Cancelar, Esc, Guardar), se resetean todos los campos. Estilos del modal: card centrada con fondo `bg-card-modal` (nuevo token: `#FBF4EC`), border `border-edge`, `rounded-[24px]`, overlay semi-transparente.

4. **`components/kids/kids-header.tsx`**: convertir el `<a href="#">` en `<button>` con `onClick` que llama a `onAddKidClick` (prop opcional). `app/page.tsx` y otros consumidores no cambian. Manual test: el botón sigue viéndose igual.

5. **`app/kids/page.tsx`**: agregar estado `isAddKidModalOpen`. Pasar `onAddKidClick` al header que abre el modal. Renderizar `<AddKidModal>` con `open`/`onClose`. Manual test: click en "Agregar niño" abre el modal; Cancelar y Esc lo cierran; los campos se resetean.

6. **Verificación final**: comparar con mockup en escritorio y 375px (capturas en `.playwright-mcp/`), `npm run lint` y `npx tsc --noEmit`.

## Acceptance criteria

- [ ] El botón "Agregar niño" del header de `/kids` abre el modal al hacer click.
- [ ] El modal se cierra con el botón "Cancelar".
- [ ] El modal se cierra con la tecla Escape.
- [ ] El modal se cierra con el botón "Guardar".
- [ ] Los campos Nombre, Fecha y Sala muestran borde rojo si están vacíos al intentar guardar.
- [ ] El campo "Sala" muestra las tres opciones: Soles, Lunas, Estrellas.
- [ ] El campo "Sala" tiene "Soles" como valor por defecto.
- [ ] Al cerrar el modal, todos los campos se resetean.
- [ ] El modal tiene foco trap (Tab/Shift+Tab no sale del modal).
- [ ] El modal tiene `role="dialog"`, `aria-modal="true"`, `aria-labelledby`.
- [ ] Al abrirse, el foco va al primer elemento enfocable del modal.
- [ ] Al cerrarse, el foco vuelve al botón "Agregar niño".
- [ ] En < 640px el modal se adapta (fullscreen o scroll interno).
- [ ] El modal replica visualmente `agregar-nino.dc.html`.
- [ ] `npm run lint` y `npx tsc --noEmit` terminan con exit code 0.
- [ ] No hay errores en la consola del browser.

## Decisiones

- **Sí:** componente modal reutilizable (`components/ui/modal.tsx`) — centraliza accesibilidad y sirve para futuras specs.
- **Sí:** `<dialog>` nativo de HTML5 — ya incluye foco básico y cierre con Esc; si no alcanza, se complementa con foco trap manual.
- **Sí:** validación visual al guardar — bordes rojos en campos obligatorios vacíos. El mockup no muestra validación pero es práctica estándar.
- **Sí:** reset del formulario al cerrar — confirmado por el usuario.
- **Sí:** tres salas estáticas (Soles, Lunas, Estrellas) — confirmado por el usuario; constantes en `lib/kids-data.ts`.
- **Sí:** input de texto para fecha de nacimiento — el mockup muestra placeholder `dd/mm/aaaa`.
- **Sí:** accesibilidad completa — confirmado por el usuario.
- **No:** persistencia — confirmado por el usuario (puramente visual).
- **No:** date picker custom — input de texto con placeholder, sin validación de formato.
- **No:** sistema de tags para alergias — input simple, confirmado por el usuario.
- **No:** animaciones de entrada/salida — no mencionadas en el mockup.

## Riesgos

| Riesgo | Mitigación |
| ------ | ---------- |
| El `<dialog>` nativo no tiene soporte completo en todos los browsers | Verificar compatibilidad; si es necesario, usar polyfill o implementar foco trap manual. |
| El foco trap puede no funcionar correctamente en todos los casos | Probar el modal en diferentes escenarios y ajustar la implementación si es necesario. |
| La validación de campos obligatorios puede no ser suficiente | El spec solo requiere validar que los campos no estén vacíos; validación de formato puede agregarse en una spec futura. |
| El modal puede no verse idéntico al mockup en diferentes tamaños de pantalla | Comparación visual con el mockup en el paso 6 con capturas lado a lado. |

## Lo que **no** va en esta spec

- Persistencia de datos (localStorage, IndexedDB, backend, API).
- El niño agregado aparece en la lista `/kids`.
- Perfiles detallados de niños agregados mediante este modal.
- Edición o eliminación de niños existentes.
- Upload de foto/avatar del niño.
- Date picker custom para fecha de nacimiento.
- Sistema de tags para alergias.
- Múltiples salas dinámicas (las tres salas son estáticas).
- Validación de formato de fecha (dd/mm/aaaa).
- Integración con autenticación o permisos de usuario.
- Animaciones de entrada/salida del modal.

Cada uno de esos, si llega, va en su propia spec.
