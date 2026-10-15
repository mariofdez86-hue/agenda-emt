# Calendario

Agenda de turnos para conductor de EMT Madrid. Inspirada en
[Shifter](../docs/shifter-referencia.md), adaptada al oficio y al convenio.

## Arrancarla

```bash
npm run arranca     # desde la raiz del repo
```

Y abrir <http://localhost:8080/calendario/>.

Sin compilador y sin dependencias: HTML, CSS y modulos ES nativos. Hace falta
servirla por HTTP (abrir `index.html` a pelo no vale, los modulos no cargan).

## Comprobarla

```bash
npm run comprueba   # sintaxis de todos los .js y .json
```

## Cómo está montada

```
index.html              armazon, menu lateral y contenedor de pantallas
manifest.webmanifest    instalable en Android y iPhone
sw.js                   service worker: la app abre sin cobertura
css/estilos.css         tokens de color y maquetacion
js/app.js               router, menu y arranque
js/datos.js             modelo y guardado en localStorage
js/formato.js           fechas, horas y utilidades
js/pantallas/*.js       una pantalla por fichero
iconos/                 iconos de la PWA
```

Para añadir una pantalla, la orden `/pantalla <nombre>` lo hace todo
(fichero, ruta en el router, entrada de menú y estilos).

## En qué punto está

| Pantalla | Estado |
|---|---|
| Calendario | **Hecha.** Mes pintado, modo pintar, hasta dos turnos por día. |
| Agenda | **Hecha.** Hoy y los próximos catorce días. |
| Estadísticas | **A medias.** Horas, días y forzosas por rango; faltan retribuciones. |
| Perfil | **A medias.** Datos, turnos y respaldo; falta editar turnos. |
| Cambios, Vacaciones, Festivos, Cocheras, Convenio, Teléfonos | Sin empezar, con las tareas apuntadas dentro. |

El orden de trabajo está en [`docs/shifter-referencia.md`](../docs/shifter-referencia.md), apartado 7.

## Los datos

Todo en el `localStorage` del propio móvil, bajo una sola clave con número de
versión. Sin cuentas, sin servidores y sin analítica. Respaldo manual a JSON
desde Perfil.
