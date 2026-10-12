# SPEC 04 — Modal para vincular padre

> **Estado:** Draft
> **Depende de:** SPEC 02, SPEC 03
> **Fecha:** 2026-10-12
> **Objetivo:** Implementar un modal accesible sobre `/kids/[id]` que permita visualizar el flujo de vinculación de un padre/tutor a un niño específico, con validación de campos obligatorios y código de invitación estático.

## Scope

**Incluye:**

- Componente modal accesible sobre `/kids/[id]`, reutilizando el `<Modal>` de SPEC 03.
- Apertura del modal con click en el enlace "Vincular otro padre" de la sección "Padres vinculados" (`LinkedParents`).
- Cierre del modal con:
  - Botón "X" (esquina superior derecha del header).
  - Tecla Escape.
- Header custom con:
  - Título "Vincular padre".
  - Subtítulo dinámico "a [nombre del niño]" (desde prop).
  - Botón de cierre (ícono X).
- Info banner azul con texto: "Le enviaremos un correo con un código para que active su cuenta. Solo verá el feed de [nombre del niño]."
- Formulario con tres campos:
  - **Nombre del padre/madre** (input de texto, obligatorio, placeholder "Ej. Diego Fernández").
  - **Email** (input type="email", obligatorio, placeholder "correo@ejemplo.com").
  - **Parentesco** (selector de tres opciones tipo pill: "Mamá", "Papá", "Tutor/a", obligatorio, sin selección por defecto).
- Validación visual al presionar "Enviar invitación":
  - Si nombre está vacío: borde rojo en el campo.
  - Si email está vacío o no tiene formato básico (debe contener "@"): borde rojo en el campo.
  - Si no se seleccionó parentesco: mensaje visual o borde indicando que es obligatorio.
- Sección de código de invitación estático:
  - Título "CÓDIGO DE INVITACIÓN".
  - Código "7K4P9" (fijo, del mockup).
  - Texto "Vence en 7 días" (estático).
- Botón "Enviar invitación" que cierra el modal si todos los campos son válidos, sin persistir datos.
- Reset del formulario al cerrar el modal (incluyendo deselect del parentesco).
- Accesibilidad completa: foco trap, `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, foco al primer elemento enfocable al abrir, foco vuelve al botón "Vincular otro padre" al cerrar.
- Conversión del enlace "Vincular otro padre" de `<a href="#">` a `<button>` con `onClick` que dispara la apertura del modal.
- Copy visible en español; identificadores en inglés.

**Fuera de alcance (para futuras specs):**

- Persistencia de datos (el padre vinculado no aparece en la lista de padres).
- Envío real de correos electrónicos.
- Generación dinámica del código de invitación.
- Countdown real de los 7 días de vencimiento.
- Edición o eliminación de padres vinculados.
- Apertura del modal desde otros lugares (ej. badge "VINCULAR" en la tarjeta del niño).
- Animaciones de entrada/salida.
- Integración con autenticación o permisos de usuario.

## Data model

No se introducen nuevas estructuras de datos. El modal reutiliza:

- `KidProfile` de `lib/kids-data.ts` (para obtener el nombre del niño).
- Estado interno del componente modal (`useState`) para los campos del formulario: `parentName`, `email`, `selectedRelationship`.
- Tipo `Relationship` local al componente: `"mom" | "dad" | "guardian"`.

## Implementation plan

1. **`app/globals.css`**: añadir tokens de color para el info banner azul (`#E3ECFB` fondo, `#4E72C8` texto/icono, `#3F5694` texto secundario) y la sección de código de invitación (`#FBF1D6` fondo, `#E6D08A` borde, `#8A7234` texto del código, `#A88526` texto de labels). No se tocan los tokens existentes. Manual test: `npm run dev` sigue mostrando todo igual.

2. **`components/kids/link-parent-modal.tsx`**: componente cliente del modal. Props: `open: boolean`, `onClose: () => void`, `kidName: string`. Usa el `<Modal>` de SPEC 03. Header custom con título "Vincular padre", subtítulo "a [kidName]", y botón X. Info banner azul con texto dinámico. Formulario con tres campos (nombre, email, parentesco) y sección de código de invitación estático. Estado interno con `useState` para los tres campos y un objeto `errors` para la validación. Al presionar "Enviar invitación": validar que nombre no esté vacío, que email tenga formato básico (contiene "@"), y que se haya seleccionado parentesco. Si hay errores, se marcan los campos con borde rojo (`border-alert-icon`). Si todo es válido, se llama a `onClose()`. Al cerrar (por cualquier razón), se resetean todos los campos y errores. Estilos calcados del mockup: pills de parentesco con estado seleccionado/no seleccionado, sección de código con borde dashed, botón "Enviar invitación" con gradiente naranja.

3. **`components/kids/linked-parents.tsx`**: convertir el `<a href="#">` de "Vincular otro padre" en `<button>` con prop `onLinkParent?: () => void`. Si se pasa la prop, se llama al hacer click. Si no, el botón no hace nada (backward compatible). Manual test: el botón sigue viéndose igual, pero ahora es enfocable y activable por teclado.

4. **`app/kids/[id]/page.tsx`**: convertir la página en cliente (o extraer la sección de padres en un wrapper cliente). Agregar estado `isLinkParentModalOpen`. Pasar `onLinkParent` al componente `LinkedParents` que abre el modal. Renderizar `<LinkParentModal>` con `open`, `onClose`, y `kidName={kid.name}`. Manual test: click en "Vincular otro padre" abre el modal; "X" y Esc lo cierran; los campos se resetean.

5. **Verificación final**: comparar con mockup en escritorio y 375px (capturas en `.playwright-mcp/`), `npm run lint` y `npx tsc --noEmit`.

## Acceptance criteria

- [ ] El botón "Vincular otro padre" de la sección "Padres vinculados" abre el modal al hacer click.
- [ ] El modal muestra el título "Vincular padre" y el subtítulo "a [nombre del niño]" dinámico.
- [ ] El modal se cierra con el botón "X" del header.
- [ ] El modal se cierra con la tecla Escape.
- [ ] El info banner azul muestra el texto correcto con el nombre del niño dinámico.
- [ ] El campo "Nombre del padre/madre" muestra borde rojo si está vacío al presionar "Enviar invitación".
- [ ] El campo "Email" muestra borde rojo si está vacío al presionar "Enviar invitación".
- [ ] El campo "Email" muestra borde rojo si no contiene "@" al presionar "Enviar invitación".
- [ ] El selector de parentesco muestra indicador visual si no se ha seleccionado ninguna opción al presionar "Enviar invitación".
- [ ] El selector de parentesco tiene tres opciones: "Mamá", "Papá", "Tutor/a".
- [ ] Al seleccionar una opción de parentesco, el pill correspondiente muestra el estilo seleccionado (fondo azul, texto azul).
- [ ] La sección de código de invitación muestra el código "7K4P9" y el texto "Vence en 7 días".
- [ ] Al presionar "Enviar invitación" con todos los campos válidos, el modal se cierra.
- [ ] Al cerrar el modal, todos los campos se resetean (nombre, email, parentesco deseleccionado, errores limpiados).
- [ ] El modal tiene foco trap (Tab/Shift+Tab no sale del modal).
- [ ] El modal tiene `role="dialog"`, `aria-modal="true"`, `aria-labelledby`.
- [ ] Al abrirse, el foco va al primer elemento enfocable del modal.
- [ ] Al cerrarse, el foco vuelve al botón "Vincular otro padre".
- [ ] El modal replica visualmente `vincular-padre.dc.html`.
- [ ] `npm run lint` y `npx tsc --noEmit` terminan con exit code 0.
- [ ] No hay errores en la consola del browser.

## Decisiones

- **Sí:** reutilizar el `<Modal>` de SPEC 03 — centraliza accesibilidad y evita duplicar foco trap y ARIA.
- **Sí:** header custom dentro del children — el mockup muestra un header con título + subtítulo + botón X, diferente al de SPEC 03. No se modifica el componente base para no romper lo ya verificado.
- **Sí:** validación visual al enviar — bordes rojos en campos obligatorios inválidos. Igual que SPEC 03.
- **Sí:** validación de formato de email — debe contener "@". Práctica estándar para campos de email.
- **Sí:** parentesco obligatorio — si no se selecciona, se muestra indicador visual. El mockup muestra las tres opciones pero ninguna seleccionada por defecto.
- **Sí:** sin selección por defecto de parentesco — el usuario debe elegir explícitamente.
- **Sí:** nombre del niño dinámico — el modal recibe `kidName` como prop y lo usa en el subtítulo y el info banner.
- **Sí:** código de invitación fijo "7K4P9" — no hay lógica de generación ni countdown real.
- **Sí:** conversión de `<a>` a `<button>` en "Vincular otro padre" — semántica correcta para una acción, no navegación.
- **Sí:** reset del formulario al cerrar — confirmado por el usuario.
- **Sí:** accesibilidad completa — confirmado por el usuario.
- **No:** persistencia — confirmado por el usuario (puramente visual).
- **No:** envío real de correos — no hay backend ni integración de email.
- **No:** generación dinámica del código — texto fijo del mockup.
- **No:** countdown real de vencimiento — texto estático "Vence en 7 días".
- **No:** apertura desde otros lugares — solo desde "Vincular otro padre" del perfil.
- **No:** modificación del `<Modal>` base — el header custom se construye dentro del children.
- **No:** animaciones de entrada/salida — no mencionadas en el mockup.

## Lo que **no** va en esta spec

- Persistencia de datos (localStorage, IndexedDB, backend, API).
- El padre vinculado aparece en la lista de padres del niño.
- Envío real de correos electrónicos con códigos de activación.
- Generación dinámica de códigos de invitación.
- Countdown real de los 7 días de vencimiento.
- Edición o eliminación de padres vinculados.
- Apertura del modal desde otros lugares (ej. badge "VINCULAR" en la tarjeta del niño).
- Integración con autenticación o permisos de usuario.
- Animaciones de entrada/salida del modal.

Cada uno de esos, si llega, va en su propia spec.
