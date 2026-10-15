---
description: Analiza el APK de Shifter con REA y actualiza el análisis
argument-hint: <ruta del apk>
---
Analiza con REA el APK que hay en `$1` (si no te paso ruta, pregúntame por ella).

Antes de nada: `rea doctor`. Si la CLI no está, dime que hay que instalarla
(`npm install --global rea-agents`) y para.

Luego, en este orden:
1. `rea analyze $1` — vista general: qué es la app, cómo está construida.
2. `rea decode-android-resources $1 --locale es --format md` — manifiesto, metadatos
   y textos en español. Aquí está lo bueno: los nombres de pantallas, botones y ajustes.
3. De las cadenas de texto, reconstruye el mapa de la app: qué pantallas tiene, qué
   opciones hay en cada una y qué datos maneja.

Después actualiza `docs/shifter-referencia.md`:
- Quita las marcas 🔎 de lo que ya hayas verificado con REA.
- Corrige lo que no cuadre con lo que has visto de verdad.
- Añade un apartado «Lo que ha salido de REA» con las cadenas y pantallas que lo
  respalden, para que se pueda comprobar.

Dos límites que no se pasan:
- De aquí salen **ideas y estructura**, no código ni recursos de Shifter. No copies
  sus textos literales a nuestra app, ni sus iconos, ni sus imágenes.
- Si algo no se puede verificar, se queda marcado con 🔎. Nada de rellenar huecos
  a ojo y dejarlo como si fuera un hecho.

Guárdalo todo en `docs/`. En esta orden no se toca `calendario/`.
