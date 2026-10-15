---
description: Trabaja el modelo de datos, migraciones y exportar/importar
argument-hint: <qué cambiar en el modelo>
---
Toca el modelo de datos de `calendario/js/datos.js`: `$ARGUMENTS`.

Reglas que no se rompen:
- Todo vive en `localStorage`, bajo una sola clave con número de versión.
- Un cambio de forma del modelo necesita **migración**: lo guardado antes tiene que
  seguir abriendo. Sube la versión y escribe el paso de la anterior a la nueva.
- `exportar()` saca un JSON legible; `importar()` lo acepta y valida antes de guardar.
- Nada de datos de ejemplo mezclados con los de verdad: los de ejemplo, en su función aparte.

Al acabar, dime qué pasa con los datos que ya tenía guardados antes del cambio.
