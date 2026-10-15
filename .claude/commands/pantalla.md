---
description: Crea una pantalla nueva con su fichero, ruta y entrada de menú
argument-hint: <nombre> [icono] [descripción de qué muestra]
---
Crea la pantalla `$1` en el proyecto `calendario/`. Si no me has entendido el nombre, pregunta antes.

Pasos, todos:
1. `calendario/js/pantallas/$1.js` exportando `export function render(contenedor, datos)`,
   con la misma forma que las pantallas que ya existen (mírate una antes de escribir).
2. Registrarla en el router de `calendario/js/app.js`.
3. Añadir su entrada al menú lateral de `calendario/index.html`, con icono y en el orden que toque.
4. Los estilos propios, al final de `calendario/css/estilos.css`, en su propio bloque comentado.
5. Si la pantalla necesita datos nuevos, amplía el modelo en `calendario/js/datos.js`
   con valores por defecto y sin romper lo que ya hay guardado.

Luego `npm run comprueba`, y dime qué se ve al entrar en la pantalla.
