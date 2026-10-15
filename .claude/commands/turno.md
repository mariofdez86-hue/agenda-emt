---
description: Añade o cambia reglas de turnos y cuadrante
argument-hint: <qué regla de turnos tocar>
---
Trabaja las reglas de turnos de `calendario/` según: `$ARGUMENTS`.

Antes de tocar nada, lee `calendario/js/datos.js` y `docs/convenio.md` si existe,
y dime con tus palabras la regla que vas a implementar. Si la regla depende del
convenio y no la tienes por escrito, pregúntame: no te la inventes.

Ten en cuenta siempre:
- Los tipos de turno: mañana, tarde, noche, partido, forzosa, libranza, vacaciones.
- Que un turno puede cruzar la medianoche.
- Que los días generados se acumulan y se gastan.
- Que un cambio con un compañero afecta a dos días, no a uno.

Al acabar, enséñame un ejemplo concreto con fechas de verdad de este mes.
