# Shifter · App de referencia

**App**: Calendario de Turnos (Shifter) — `com.lrhsoft.shiftercalendar`, de LRHSoft.
Android e iOS. Gratis con compras dentro de la app y versión PRO.
En App Store: 4,7 con unas 32.000 valoraciones.

> **Aviso sobre las fuentes.** Desde el contenedor de la sesión no se puede entrar en
> `play.google.com` ni en `apps.apple.com` (los bloquea la política de red del entorno),
> así que esto sale de las descripciones de las fichas recogidas en búsqueda, **no de
> haber usado la app**. Todo lo marcado con 🔎 está sin verificar en pantalla.
> Para cerrarlo bien: instalarla en el móvil y pasarme capturas de cada pantalla
> (orden `/shifter` con las capturas adjuntas).

Ojo, que hay dos apps con el mismo nombre comercial. La del enlace es la de **LRHSoft**,
la buena, la de las 32.000 valoraciones. La otra, de iDevBand, va de elegir tu empresa
de una base de datos: otro enfoque y casi sin usuarios.

## 1. Qué resuelve y para quién

Trabajadores a turnos en general: sanitarios, fábrica, seguridad, transporte. Resuelve
tres cosas y las resuelve bien:

1. **Ver el mes de un vistazo** con cada día pintado del color de su turno.
2. **Rellenar el calendario rápido**, sin pelearse con formularios.
3. **Saber cuánto has trabajado y cuánto vas a cobrar** en un rango de fechas.

No es una app de empresa: no hay cuadrante compartido ni compañeros. Es la libreta
del trabajador, para él solo. Ahí está su virtud y ahí está su límite.

## 2. Pantallas 🔎

| Pantalla | Qué muestra / qué se hace |
|---|---|
| **Mes** | Rejilla del mes con los días pintados por turno. Es la pantalla de casa. |
| **Año** | Los doce meses juntos, para ver el patrón de un año de un golpe. |
| **Pintar** | Eliges un turno y vas tocando días para asignarlo. Rápido, sin diálogos. |
| **Edición por lotes** | Seleccionas varios días y repites, copias, cortas, pegas o borras. |
| **Turnos** | Creas y configuras cada turno: nombre, color, horas, partido, descanso. |
| **Día** | Detalle de un día: hasta dos turnos, horas extra, salida anticipada, nota. |
| **Notas** | Nota por día, con recordatorio, alarma con sonido propio e imágenes. |
| **Estadísticas** | Tiempo trabajado e ingresos en el rango de fechas que elijas. |
| **Ajustes** | Exportar a Google Calendar, importar festivos, copia de seguridad. |
| **Widgets** | Semana o mes en la pantalla de inicio del móvil. |

## 3. Modelo de datos que se deduce

```
Turno        nombre, color, hora de entrada, hora de salida, si es partido,
             descanso, precio/hora o importe, etiqueta corta
Día          fecha, turno1, turno2, horas extra, salida anticipada, nota
Nota         fecha, texto, imágenes, recordatorio (fecha y hora), alarma
Ajustes      primer día de semana, moneda, formato de hora, copia de seguridad
Calendario   varios calendarios, y se puede importar turnos de uno a otro
```

Dos detalles que conviene copiar tal cual:

- **Dos turnos por día.** Resuelve el partido y el doblaje sin inventar nada raro.
- **Varios calendarios con importación entre ellos.** Sirve para planificar un mes
  en borrador y luego volcarlo al bueno.

## 4. Lo que copiamos

- **El mes pintado por colores** como pantalla principal. Es lo que se mira 20 veces al día.
- **El modo pintar.** Tocar días seguidos para asignar turno, sin abrir un formulario
  por día. Esto es lo que hace que la app se use y no se abandone.
- **Edición por lotes.** Copiar una semana y pegarla cuatro veces es *el* caso de uso
  de un cuadrante cíclico.
- **Turnos configurables con color, horas y partido.** Mañana, tarde, noche y partido
  de EMT entran directos aquí.
- **Estadísticas por rango de fechas.** Para nosotros: horas, festivos trabajados,
  días generados y retribuciones.
- **Vista de año.** Para pedir vacaciones mirando todo el año.
- **Alarma por turno.** Un conductor de mañana que entra a las 5:40 la quiere.
- **Exportar/importar.** En nuestro caso, JSON propio, que no dependemos de Google.

## 5. Lo que no copiamos

- **Compras integradas, PRO y publicidad.** La nuestra es para ti y para los compañeros.
- **La base de datos de empresas** (eso es de la otra app). Nosotros somos de EMT y ya.
- **Google Calendar como pieza central.** Sincronizar con la cuenta de Google mete
  permisos y dependencias para nada. Si acaso, exportar un `.ics` y listo.
- **Imágenes dentro de las notas.** Engorda el almacenamiento y casi nadie las usa.
- **Varios calendarios a la vez.** De momento sobra: un cuadrante y un año.

## 6. Lo que nos falta (lo propio de EMT, que Shifter no tiene)

Aquí es donde `calendario` deja de ser un clon y se convierte en tu app:

| Nuestro | Por qué Shifter no llega |
|---|---|
| **Forzosas** | Jornada obligatoria fuera del cuadrante. Hay que contarlas y avisarlas. |
| **Días generados** | Se acumulan por festivos y exceso de jornada, y se gastan. Shifter no sabe de bolsas de días. |
| **Cambios con compañeros** | Un cambio toca dos días y a dos personas. Shifter es de un solo trabajador. |
| **Cocheras y líneas** | De dónde sales, en qué línea, qué coche. No existe en una app genérica. |
| **Retribuciones de convenio** | Pluses, nocturnidad, festivos. No es `horas × precio`. |
| **Festivos de Madrid** | Los nacionales, los de la Comunidad y los locales, ya metidos. |
| **Vacaciones y su cómputo** | Cómo cuentan según convenio. |
| **El convenio a mano** | Consultarlo desde la propia app, como ya hace tu prototipo. |

Y una ventaja que ya tienes: el prototipo de AgendaBus (`prototipo.html`) tiene
resueltas estas diez pantallas. Shifter aporta el **cómo** (pintar, lotes, estadísticas);
tu prototipo aporta el **qué** (el oficio).

## 7. Orden de trabajo para este fin de semana

1. **Sábado por la mañana** — El mes pintado. Rejilla, tipos de turno con color y
   guardado en el móvil. Que puedas pintar enero entero y que siga ahí al cerrar.
2. **Sábado por la tarde** — El modo pintar y los lotes: selección múltiple, copiar
   y pegar una semana. Con esto metes un cuadrante cíclico en dos minutos.
3. **Domingo por la mañana** — Detalle del día: dos turnos, línea, coche, cochera,
   forzosa y nota.
4. **Domingo por la tarde** — Estadísticas del rango: horas, festivos, días generados.
5. **Después** — Cambios con compañeros, vacaciones, festivos de Madrid y convenio.

Lo primero es lo primero: hasta que pintar un mes no funcione bien, nada de estadísticas.
