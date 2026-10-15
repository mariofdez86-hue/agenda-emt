---
description: Revisa que la app sea instalable y funcione sin cobertura
---
Comprueba la parte PWA de `calendario/`:

1. `manifest.webmanifest`: nombre, iconos (192 y 512), `start_url`, `display: standalone`,
   `theme_color` y `background_color` acordes al tema oscuro.
2. `index.html`: enlace al manifest y metas de iOS (`apple-mobile-web-app-*`, `apple-touch-icon`).
3. `sw.js`: todos los ficheros del proyecto en la lista de caché, versión de caché subida
   si algo ha cambiado, y limpieza de cachés viejas al activarse.
4. Que al abrir sin red la app muestre la agenda guardada, no una página de error.

Dime qué falta para que se pueda instalar en un móvil Android y en un iPhone.
