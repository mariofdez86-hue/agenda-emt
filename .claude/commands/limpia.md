---
description: Borra restos y código muerto
---
Busca en `calendario/` y en la raíz del repo:

- Ficheros que no use nadie (nada los enlaza ni los importa).
- Funciones y variables que no se llaman desde ningún sitio.
- Pantallas huérfanas: fichero sin ruta en el router, o ruta sin fichero.
- CSS de clases que ya no existen en el HTML ni en el JS.
- Datos de ejemplo olvidados en medio del código de verdad.
- Ficheros temporales, `.DS_Store`, copias con `.bak`, `copia`, `old` o `v2` en el nombre.

Enséñame la lista con el porqué de cada uno **y espera a que yo diga qué se borra**.
No borres nada por tu cuenta.
