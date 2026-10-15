# agenda-emt · Memoria del proyecto

Contexto que Claude Code lee en cada sesión. Si cambias de rumbo, cambia este fichero
primero y lo demás después.

## Quién trabaja aquí

Mario, conductor de **EMT Madrid**. Las aplicaciones de este repo son para
conductores: cuadrante, días generados, cambios con compañeros y nómina.
Todo en **español**: interfaz, nombres de ficheros, variables, comentarios y commits.

## Qué hay en el repo

| Ruta | Qué es |
|---|---|
| `index.html` | Portada de AgendaBus (web pública de descarga). |
| `manual.html` | Manual de uso de AgendaBus, al día con la 2.0. |
| `privacidad.html` | Política de privacidad (Android, iPhone y Windows). |
| `windows.html` | Página de descarga para Windows. |
| `prototipo.html` | Prototipo de AgendaBus en un solo HTML (maqueta de móvil). |
| `capturas/` | Capturas e icono que usan las páginas. |
| `calendario/` | **Proyecto nuevo.** La app de agenda de turnos. Aquí se trabaja. |
| `docs/` | Notas de diseño y análisis de apps de referencia. |
| `docs/shifter-referencia.md` | Qué hace Shifter, qué copiamos y qué no. |
| `docs/rea.md` | REA: cómo mirar Shifter por dentro. |
| `.claude/commands/` | Órdenes de terminal (ver abajo). |

## El proyecto nuevo: `calendario/`

Una app de **agenda de turnos** para conductor de EMT, inspirada en **Shifter**
(app de referencia; el análisis vive en `docs/shifter-referencia.md`).

Reglas de la casa:

- **Sin compilador y sin dependencias.** HTML + CSS + JavaScript de toda la vida,
  módulos ES nativos. Si algo necesita `npm install`, no entra sin hablarlo.
- **Funciona sin internet.** PWA con service worker. El móvil va por túneles y
  cocheras sin cobertura: la app tiene que abrir igual.
- **Los datos son del usuario.** Todo en `localStorage` del propio móvil. Nada de
  servidores, cuentas ni analítica. Exportar e importar en JSON.
- **Primero el móvil.** Se diseña a 360 px de ancho y luego se ensancha.
- **Un fichero, una pantalla.** Cada pantalla en `calendario/js/pantallas/`.
- **Nada de datos reales de compañeros** en el repo: nombres, matrículas y
  teléfonos de ejemplo siempre inventados.

### Estructura

```
calendario/
  index.html              armazón, menú lateral y contenedor de pantallas
  manifest.webmanifest    instalable en Android/iPhone
  sw.js                   service worker (caché para uso sin cobertura)
  css/estilos.css         tokens de color y maquetación
  js/app.js               router, menú y arranque
  js/datos.js             modelo y persistencia en localStorage
  js/formato.js           fechas, horas y utilidades
  js/pantallas/*.js       una pantalla por fichero
```

### Pantallas (las mismas que el prototipo de AgendaBus)

`agenda` · `calendario` · `cambios` · `vacaciones` · `estadisticas` ·
`festivos` · `cocheras` · `convenio` · `telefonos` · `perfil`

### Vocabulario del oficio (úsalo tal cual en el código)

- **Turno**: jornada asignada. Mañana, tarde, noche o partido.
- **Cuadrante**: la planilla de turnos del grupo.
- **Forzosa**: jornada de trabajo obligatoria fuera del cuadrante normal.
- **Día generado**: día libre que se acumula por trabajar festivos o exceso de jornada.
- **Libranza**: día de descanso.
- **Cambio**: intercambio de turno con otro compañero.
- **Cochera**: base donde empieza y acaba el turno.
- **Línea**: número de la línea de autobús.
- **Coche**: el autobús concreto, por su número interno.
- **Retribuciones**: lo que se cobra; conceptos de la nómina.
- **Convenio**: el convenio colectivo, de donde salen las reglas.

## Estilo visual

Hereda la identidad de AgendaBus (ya en `index.html` y `prototipo.html`):

```
fondo      #080C18      superficie  #0F1526     superficie2 #131A2F
borde      #1E2740      tinta       #F1F5FF     apagada     #7E8AAB
tenue      #4A5674      naranja     #EF9F27     verde       #4ADE80
```

Tipografías: `Archivo` para texto, `IBM Plex Mono` para números y rótulos.
Tema oscuro siempre. Los acentos en naranja, nunca en azul.

## Cómo se trabaja

- Rama de trabajo: `claude/shifter-project-setup-1qfduh`. No se toca `main` sin pedirlo.
- Commits en español, en imperativo y cortos, al estilo de los que ya hay:
  "El manual, al dia con la 2.0", "Portada de AgendaBus".
- Un commit por cosa terminada. No se acumulan diez cambios en uno.
- Antes de dar algo por hecho: `npm run comprueba` y abrirlo en el navegador.

## Órdenes

Se escriben con `/` en la terminal de Claude Code. Están en `.claude/commands/`.

| Orden | Qué hace |
|---|---|
| `/arranca` | Levanta el servidor local y dice en qué dirección mirar. |
| `/pantalla <nombre>` | Crea una pantalla nueva con su fichero, su ruta y su entrada de menú. |
| `/revisa` | Repasa los cambios: sintaxis, enlaces roto, pantallas sin registrar. |
| `/shifter <enlace>` | Analiza la app de referencia y escribe `docs/shifter-referencia.md`. |
| `/turno` | Añade o cambia reglas de turnos y cuadrante en el modelo de datos. |
| `/datos` | Trabaja el modelo: campos nuevos, migraciones, exportar e importar. |
| `/pwa` | Revisa que la app siga siendo instalable y funcione sin cobertura. |
| `/captura` | Abre la app en el navegador y guarda capturas en `calendario/capturas/`. |
| `/guarda <mensaje>` | Commit con el mensaje dado y push a la rama de trabajo. |
| `/estado` | Resumen de en qué punto está el proyecto y qué toca ahora. |
| `/limpia` | Borra restos: ficheros sueltos, código muerto, pantallas huérfanas. |
| `/convenio <tema>` | Apunta en `docs/convenio.md` una regla del convenio para aplicarla. |
| `/rea <apk>` | Analiza el APK de Shifter con REA y actualiza el análisis. |

Y las que ya trae Claude Code: `/init`, `/code-review`, `/simplify`,
`/security-review`, `/config`, `/fast`.

## Comandos de terminal

```bash
npm run arranca      # servidor local en http://localhost:8080/calendario/
npm run comprueba    # sintaxis de todos los .js y .json
npm run arbol        # estructura del proyecto
```

## REA

[REA](https://github.com/morluto/rea) analiza apps sin tener su código, APK de Android
incluidos. Lo usamos para entender Shifter por dentro. Instalación, comandos y límites,
en `docs/rea.md`.

```bash
npm install --global rea-agents           # la CLI
rea setup --client claude_code            # registrar el MCP (lo lanza Mario, no el agente)
rea decode-android-resources shifter.apk --locale es --format md
```

De REA salen **ideas y estructura**. Código, textos e imágenes de Shifter, no:
`calendario/` se escribe entero aquí.
