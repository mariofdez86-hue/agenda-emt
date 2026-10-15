// Fechas, horas y utilidades. Nada de librerias: solo lo que hace falta.

export const DIAS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
export const MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

/** Clave de un dia: '2026-01-07'. Es como se guarda todo. */
export function clave(fecha) {
  const m = String(fecha.getMonth() + 1).padStart(2, '0');
  const d = String(fecha.getDate()).padStart(2, '0');
  return `${fecha.getFullYear()}-${m}-${d}`;
}

/** De clave a Date, en hora local (sin sustos de zona horaria). */
export function fecha(clave) {
  const [a, m, d] = clave.split('-').map(Number);
  return new Date(a, m - 1, d);
}

export function esHoy(clave_) {
  return clave_ === clave(new Date());
}

/** Lunes = 0, domingo = 6. Aqui la semana empieza en lunes. */
export function diaSemana(fecha) {
  return (fecha.getDay() + 6) % 7;
}

/**
 * Rejilla del mes: siempre semanas completas de lunes a domingo,
 * con los dias de relleno marcados para pintarlos apagados.
 */
export function rejilla(anio, mes) {
  const primero = new Date(anio, mes, 1);
  const arranque = new Date(anio, mes, 1 - diaSemana(primero));
  const dias = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(arranque.getFullYear(), arranque.getMonth(), arranque.getDate() + i);
    dias.push({ fecha: d, clave: clave(d), relleno: d.getMonth() !== mes });
    if (i >= 34 && diaSemana(d) === 6 && d.getMonth() !== mes) break;
  }
  return dias;
}

export function mesLargo(anio, mes) {
  const m = MESES[mes];
  return `${m[0].toUpperCase()}${m.slice(1)} de ${anio}`;   // 'Octubre de 2026'
}

/** '05:40' a minutos desde medianoche. */
export function aMinutos(hora) {
  const [h, m] = hora.split(':').map(Number);
  return h * 60 + m;
}

/** Duracion de un turno en minutos, descuento de descanso y cruce de medianoche incluidos. */
export function duracion(entrada, salida, descanso = 0) {
  let min = aMinutos(salida) - aMinutos(entrada);
  if (min < 0) min += 24 * 60;        // el turno cruza la medianoche
  return Math.max(0, min - descanso);
}

/** 455 minutos a '7h 35m'. */
export function enHoras(minutos) {
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  return m ? `${h}h ${String(m).padStart(2, '0')}m` : `${h}h`;
}

export function euros(cantidad) {
  return cantidad.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
}
