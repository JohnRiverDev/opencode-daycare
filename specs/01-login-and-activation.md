# SPEC 01 — Login y activación de cuenta

> **Status:** Approved
> **Depends on:** —
> **Date:** 2026-10-10
> **Objective:** Implementar las pantallas de inicio de sesión y activación de cuenta como rutas estáticas accesibles en `/login` y `/activar-cuenta`.

## Scope

**In:**

- Pantalla de login en `app/login/page.tsx` con el diseño de dos columnas (panel lateral de branding + formulario).
- El formulario de login incluye campos de email y contraseña, link "¿Olvidaste tu contraseña?" (visual), botón "Iniciar sesión" que navega a `/`, y link "Activá tu cuenta" que navega a `/activar-cuenta`.
- **NO** incluye los selectores de rol "Personal" / "Familia" ni la label "INGRESO COMO".
- Pantalla de activación de cuenta en `app/activar-cuenta/page.tsx` con diseño centrado.
- El formulario de activación lee datos desde searchParams (`code`, `email`, `kidName`, `roomName`) con fallbacks estáticos si no se pasan.
- Botón "Activar mi cuenta" navega a `/`.
- Link "Iniciar sesión" navega a `/login`.
- Todo el styling con Tailwind CSS usando las variables del design system en `globals.css`.
- Server Components (sin `"use client"`) porque no hay interactividad real.

**Out of scope (for future specs):**

- Lógica real de autenticación (validación de credenciales, tokens, sesiones).
- Protección de rutas (el feed en `/` sigue siendo accesible directamente).
- Funcionalidad de "¿Olvidaste tu contraseña?" (solo visual).
- Validación de formularios (campos vacíos, email inválido).
- Estados de carga, error o feedback visual en los inputs.
- Integración con backend o API.
- Flujo de activación real (verificación de código de invitación, creación de contraseña en BD).

## Data model

This feature introduces no new data structures. No hay tipos, interfaces o modelos nuevos — solo UI estática.

## Implementation plan

1. **Crear estructura de carpetas para las rutas.** Crear `app/login/page.tsx` y `app/activar-cuenta/page.tsx` como Server Components vacíos que renderizan un `<div>` simple. Verificar que `/login` y `/activar-cuenta` cargan sin errores.

2. **Implementar la pantalla de login.** En `app/login/page.tsx`, construir el layout de dos columnas:
   - Columna izquierda: panel de branding con fondo degradado (`bg-gradient-to-br` con los tonos flame/peach), logo SVG, texto "OpenDayCare", título, subtítulo y footer con nombre de guardería.
   - Columna derecha: formulario centrado con título "Iniciar sesión", subtítulo, campos de email y contraseña (inputs estilizados), link "¿Olvidaste tu contraseña?" (sin acción), botón "Iniciar sesión" como `<Link href="/">`, y link "Activá tu cuenta" como `<Link href="/activar-cuenta">`.
   - **NO** incluir la sección "INGRESO COMO" ni los botones de Personal/Familia.
   - Usar las clases de Tailwind y variables CSS del design system (`bg-cream`, `text-ink`, `font-display`, `font-sans`, `bg-flame`, `text-accent-deep`, etc.).
   - Prueba manual: navegar a `/login`, verificar que se ve como el mockup (sin los selectores de rol).

3. **Implementar la pantalla de activación de cuenta.** En `app/activar-cuenta/page.tsx`:
   - Convertir el componente en async para recibir searchParams (según Next.js 16 App Router).
   - Extraer `code`, `email`, `kidName`, `roomName` de searchParams con valores por defecto (`7K4P9`, `lucia.fernandez@gmail.com`, `Mateo`, `Sala Soles`).
   - Construir el layout centrado con: logo en gradiente, título "Bienvenida a OpenDayCare", subtítulo, tarjeta de invitación mostrando "Seguir a {kidName} · {roomName}", campo de código de invitación (con `value={code}`), campo email (con `value={email}`), campo "Crear contraseña", checkbox de autorización (visual, no funcional), botón "Activar mi cuenta" como `<Link href="/">`, y link "Iniciar sesión" como `<Link href="/login">`.
   - Prueba manual: navegar a `/activar-cuenta?code=ABC12&email=test@test.com&kidName=Sofia&roomName=Sala Lunas`, verificar que los campos muestran esos valores. Navegar a `/activar-cuenta` sin params, verificar que muestra los valores por defecto.

4. **Verificar navegación bidireccional.** Desde `/login`, hacer clic en "Activá tu cuenta" y verificar que lleva a `/activar-cuenta`. Desde `/activar-cuenta`, hacer clic en "Iniciar sesión" y verificar que lleva a `/login`. Desde `/login`, hacer clic en "Iniciar sesión" y verificar que lleva a `/` (feed). Desde `/activar-cuenta`, hacer clic en "Activar mi cuenta" y verificar que lleva a `/`.

5. **Ajustes finales de responsive y spacing.** Revisar que en pantallas pequeñas el layout de login colapse a una sola columna (el panel lateral se oculta o se reduce), y que los paddings/margins se vean bien en móvil. Agregar clases `hidden lg:flex` al panel lateral si es necesario.

## Acceptance criteria

- [ ] La ruta `/login` carga sin errores en la consola.
- [ ] La ruta `/activar-cuenta` carga sin errores en la consola.
- [ ] La pantalla de login muestra el panel lateral de branding con el logo, título "El día de cada niño, compartido con su familia." y subtítulo.
- [ ] La pantalla de login **NO** muestra los selectores de rol "Personal" / "Familia" ni la label "INGRESO COMO".
- [ ] La pantalla de login tiene campos de email y contraseña con el styling del design system (border-radius 14px, border `#EADFD0`, background blanco).
- [ ] La pantalla de login tiene el botón "Iniciar sesión" con el gradiente de flame a flame-deep y sombra.
- [ ] La pantalla de login tiene el link "Activá tu cuenta" que navega a `/activar-cuenta`.
- [ ] La pantalla de activación muestra la tarjeta de invitación con el nombre del niño y la sala.
- [ ] La pantalla de activación lee los parámetros `code`, `email`, `kidName`, `roomName` de la URL y los muestra en los campos correspondientes.
- [ ] La pantalla de activación muestra valores por defecto cuando no se pasan searchParams.
- [ ] La pantalla de activación tiene el botón "Activar mi cuenta" que navega a `/`.
- [ ] La pantalla de activación tiene el link "Iniciar sesión" que navega a `/login`.
- [ ] El feed existente en `/` sigue siendo accesible directamente (sin protección de ruta).
- [ ] Todos los componentes son Server Components (no tienen `"use client"` al inicio del archivo).
- [ ] El styling usa Tailwind CSS y las variables del design system definidas en `globals.css`.

## Decisions

- **Yes:** Rutas en `/login` y `/activar-cuenta`. Claro y explícito, no usa la raíz `/` para login (que queda para el feed).
- **Yes:** Server Components para ambas pantallas. No hay interactividad real (los formularios son estáticos, los botones son links de navegación), así que no necesitamos estado ni efectos.
- **Yes:** Panel lateral de branding inline en `app/login/page.tsx`. Es exclusivo del login y no se reutiliza en otra pantalla, así que no necesita ser componente separado.
- **Yes:** SearchParams para los datos de activación. Permite que la pantalla sea funcional si se comparte un link con el código de invitación y datos del niño. Los fallbacks estáticos permiten probar la pantalla sin pasar params.
- **No:** Validación de formularios. Va en otro spec si se necesita. Por ahora los formularios son visuales.
- **No:** Protección de rutas. El feed sigue siendo accesible directamente. Si se necesita autenticación real, va en otro spec.
- **No:** Selectores de rol "Personal" / "Familia". El usuario los eliminó explícitamente del scope.
- **No:** Link "¿Olvidaste tu contraseña?" funcional. Solo visual, sin acción. Va en otro spec si se necesita.

## What is **not** in this spec

- Lógica real de autenticación (validación de credenciales, tokens, sesiones).
- Protección de rutas detrás de login.
- Funcionalidad de "¿Olvidaste tu contraseña?".
- Validación de formularios (campos vacíos, email inválido, fortaleza de contraseña).
- Integración con backend o API.
- Flujo de activación real (verificación de código, creación de contraseña en BD).
- Selectores de rol "Personal" / "Familia".

Cada uno de esos, si se necesita, va en su propio spec.
