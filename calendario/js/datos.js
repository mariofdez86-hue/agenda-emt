// Modelo y persistencia. Todo vive en el movil, en localStorage, bajo una sola clave.
// Si cambia la forma del modelo: sube VERSION y escribe su migracion.

import { duracion } from './formato.js';

const CLAVE = 'calendario-emt';
const VERSION = 1;

/** Turnos de partida de un conductor de EMT. Se pueden cambiar en Perfil. */
function turnosPorDefecto() {
  return [
    { id: 'm', nombre: 'Mañana',   corto: 'M', color: '#EF9F27', entrada: '05:40', salida: '13:20', descanso: 0,  partido: false },
    { id: 't', nombre: 'Tarde',    corto: 'T', color: '#60A5FA', entrada: '13:10', salida: '20:50', descanso: 0,  partido: false },
    { id: 'n', nombre: 'Noche',    corto: 'N', color: '#A78BFA', entrada: '21:30', salida: '05:30', descanso: 0,  partido: false },
    { id: 'p', nombre: 'Partido',  corto: 'P', color: '#34D399', entrada: '07:00', salida: '20:00', descanso: 240, partido: true },
    { id: 'f', nombre: 'Forzosa',  corto: 'F', color: '#F87171', entrada: '06:00', salida: '14:00', descanso: 0,  partido: false },
    { id: 'l', nombre: 'Libranza', corto: 'L', color: '#334155', entrada: '',      salida: '',      descanso: 0,  partido: false },
    { id: 'v', nombre: 'Vacaciones', corto: 'V', color: '#4ADE80', entrada: '',    salida: '',      descanso: 0,  partido: false },
  ];
}

function vacio() {
  return {
    version: VERSION,
    perfil: { nombre: '', grupo: '', cochera: '', diasGenerados: 0 },
    turnos: turnosPorDefecto(),
    // dias: { '2026-01-07': { turnos: ['m'], linea: '', coche: '', extra: 0, nota: '' } }
    dias: {},
  };
}

/** Migraciones de una version a la siguiente. Lo guardado antes tiene que seguir abriendo. */
const migraciones = {
  // 1: (d) => { ... }   cuando llegue la version 2, aqui va el paso de la 1 a la 2
};

function migra(datos) {
  while (datos.version < VERSION) {
    const paso = migraciones[datos.version];
    if (!paso) { datos.version = VERSION; break; }
    datos = paso(datos);
    datos.version++;
  }
  return datos;
}

let datos = cargar();

function cargar() {
  try {
    const bruto = localStorage.getItem(CLAVE);
    if (!bruto) return vacio();
    return migra({ ...vacio(), ...JSON.parse(bruto) });
  } catch (e) {
    console.warn('No se pudo leer lo guardado, se empieza de cero:', e);
    return vacio();
  }
}

function guarda() {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(datos));
  } catch (e) {
    console.error('No se pudo guardar:', e);
  }
}

// ── Lectura ──────────────────────────────────────────────

export function todo() {
  return datos;
}

export function turnos() {
  return datos.turnos;
}

export function turno(id) {
  return datos.turnos.find((t) => t.id === id) || null;
}

export function dia(clave) {
  return datos.dias[clave] || null;
}

/** Minutos trabajados en un dia, los dos turnos y las horas extra incluidos. */
export function minutosDia(clave) {
  const d = dia(clave);
  if (!d) return 0;
  let min = (d.extra || 0) * 60;
  for (const id of d.turnos || []) {
    const t = turno(id);
    if (t && t.entrada && t.salida) min += duracion(t.entrada, t.salida, t.descanso);
  }
  return min;
}

/** Resumen de un rango de claves de dia, para Estadísticas. */
export function resumen(desde, hasta) {
  const r = { minutos: 0, dias: 0, porTurno: {}, forzosas: 0 };
  for (const [clave, d] of Object.entries(datos.dias)) {
    if (clave < desde || clave > hasta) continue;
    const trabajado = minutosDia(clave);
    if (trabajado > 0) { r.dias++; r.minutos += trabajado; }
    for (const id of d.turnos || []) {
      r.porTurno[id] = (r.porTurno[id] || 0) + 1;
      if (id === 'f') r.forzosas++;
    }
  }
  return r;
}

// ── Escritura ────────────────────────────────────────────

/** Pinta un turno en un dia. Hasta dos turnos por dia (el partido y el doblaje). */
export function pinta(clave, idTurno) {
  const d = datos.dias[clave] || { turnos: [], linea: '', coche: '', extra: 0, nota: '' };
  if (d.turnos.includes(idTurno)) {
    d.turnos = d.turnos.filter((x) => x !== idTurno);   // volver a tocar lo quita
  } else if (d.turnos.length < 2) {
    d.turnos.push(idTurno);
  } else {
    d.turnos = [d.turnos[1], idTurno];                  // entra el nuevo, sale el mas viejo
  }
  if (!d.turnos.length && !d.nota && !d.extra) delete datos.dias[clave];
  else datos.dias[clave] = d;
  guarda();
  return datos.dias[clave] || null;
}

export function borra(clave) {
  delete datos.dias[clave];
  guarda();
}

export function cambiaDia(clave, campos) {
  datos.dias[clave] = { turnos: [], linea: '', coche: '', extra: 0, nota: '', ...dia(clave), ...campos };
  guarda();
}

export function cambiaPerfil(campos) {
  datos.perfil = { ...datos.perfil, ...campos };
  guarda();
}

export function cambiaTurnos(lista) {
  datos.turnos = lista;
  guarda();
}

// ── Exportar e importar ──────────────────────────────────

export function exportar() {
  return JSON.stringify(datos, null, 2);
}

/** Valida antes de guardar: un JSON de otra app no se traga. */
export function importar(texto) {
  const nuevo = JSON.parse(texto);
  if (typeof nuevo !== 'object' || nuevo === null) throw new Error('El fichero no es un respaldo valido');
  if (!Array.isArray(nuevo.turnos)) throw new Error('Al fichero le faltan los turnos');
  if (typeof nuevo.dias !== 'object' || nuevo.dias === null) throw new Error('Al fichero le faltan los dias');
  datos = migra({ ...vacio(), ...nuevo });
  guarda();
  return datos;
}

/** Vacia todo. Solo desde Perfil y preguntando dos veces. */
export function borraTodo() {
  datos = vacio();
  guarda();
}
