# REA · Mirar Shifter por dentro

[REA](https://github.com/morluto/rea) (*Reverse Engineer Anything*) analiza aplicaciones
sin tener su código: APK de Android, apps web, binarios, tráfico de red y dispositivos
por ADB. Es un servidor MCP para el agente **y** una CLI para la terminal.

Lo usamos para una cosa concreta: entender **cómo funciona Shifter por dentro**
(qué pantallas tiene, cómo guarda los turnos, qué estructura de datos usa) y llevarnos
las ideas a `calendario/`, que es nuestro, para conductores de EMT y con nuestro convenio.

> Entender cómo funciona una app y escribir la tuya es una cosa; copiar su código,
> sus recursos o sus textos es otra. Nos quedamos con lo primero: de REA salen ideas
> y estructura, no ficheros de Shifter.

## Instalación

Hace falta Node 22.19+ (aquí hay 22.22, vale).

```bash
npm install --global rea-agents     # la CLI: rea
rea --version
rea doctor                          # qué motores de análisis tienes y cuáles faltan
```

Para que yo (Claude Code) pueda usar REA como herramienta, además:

```bash
rea setup --client claude_code --dry-run    # mira primero qué va a tocar
rea setup --client claude_code              # registra el MCP e instala el skill
```

Esto escribe en `~/.claude.json` (deja copia en `~/.claude.json.rea.backup`) e instala
el skill en `~/.claude/skills/reverse-engineer-anything`. Luego hay que reiniciar
Claude Code. **Lo tienes que lanzar tú**: desde la sesión en la nube está bloqueado,
porque modifica la configuración del propio agente.

En este contenedor la CLI ya está instalada, pero el contenedor se recicla: en tu
máquina hay que instalarla una vez.

## Conseguir el APK de Shifter

Desde esta sesión no se puede: la política de red del entorno bloquea `play.google.com`.
En tu máquina, con el móvil por USB y la depuración USB activada:

```bash
adb shell pm path com.lrhsoft.shiftercalendar     # dice dónde está el APK
adb pull /data/app/.../base.apk shifter.apk       # la ruta que haya dicho
```

Si la app viene partida en varios APK (`base.apk`, `split_config.*`), con el `base.apk`
basta para lo que nos interesa.

## Los comandos que nos sirven

```bash
rea doctor                                   # ¿está todo listo?
rea analyze shifter.apk                      # vista general de la app
rea decode-android-resources shifter.apk     # manifiesto, metadatos y textos
rea decode-android-resources shifter.apk --locale es --format md
```

De `decode-android-resources` sale lo más jugoso para nosotros: **las cadenas de texto**
de la app en español. Ahí se leen los nombres de pantallas, botones, ajustes y avisos,
y con eso se reconstruye casi entera su estructura sin tocar una línea de su código.

Para bajar al detalle de la lógica hace falta un decompilador de Java. REA no lo descarga:
hay que pasarle el JAR de `jadx-headless-mcp` 0.7.1 en `REA_JADX_MCP_JAR`. Para lo que
queremos (pantallas, flujo y modelo de datos) con los recursos y el manifiesto sobra.

También sabe mirar la app **en marcha** en el móvil, que para una agenda de turnos
dice más que el código:

```bash
rea capture-adb-screen            # una captura de pantalla del móvil
rea collect-adb-bugreport         # informe del dispositivo
```

## Qué hacer con lo que salga

Todo lo que se saque va a [`docs/shifter-referencia.md`](shifter-referencia.md), que
ahora mismo está escrito a partir de las fichas de las tiendas y lleva marcado con 🔎
lo que está sin verificar. Según vaya llegando lo de REA, se quitan esas marcas y se
corrige lo que no cuadre.

La orden `/rea <ruta del apk>` hace todo esto de un tirón.
