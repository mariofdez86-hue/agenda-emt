// Hoy y los proximos dias. Lo primero que quieres ver al abrir la app.

import { clave, fecha, MESES, DIAS, diaSemana, enHoras } from '../formato.js';
import * as datos from '../datos.js';

export function render(contenedor) {
  const hoy = new Date();
  const proximos = [];
  for (let i = 0; i < 14; i++) {
    const d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + i);
    proximos.push({ fecha: d, clave: clave(d), guardado: datos.dia(clave(d)) });
  }

  const conTurno = proximos.filter((p) => p.guardado && p.guardado.turnos.length);

  contenedor.innerHTML = `
    <h2 class="pantalla-titulo">Agenda</h2>
    ${conTurno.length ? '' : `
      <div class="aviso">
        <p>No tienes turnos pintados en los próximos catorce días.</p>
        <p class="aviso-pie">Ve al <b>Calendario</b>, elige un turno abajo y toca los días.</p>
      </div>`}
    <ul class="lista-dias">
      ${proximos.map((p) => fila(p, p.clave === clave(hoy))).join('')}
    </ul>
  `;
}

function fila(p, es_hoy) {
  const g = p.guardado;
  const turnos = (g ? g.turnos : []).map((id) => datos.turno(id)).filter(Boolean);
  const min = datos.minutosDia(p.clave);

  return `
    <li class="fila-dia${es_hoy ? ' hoy' : ''}">
      <div class="fila-fecha">
        <b>${p.fecha.getDate()}</b>
        <span>${DIAS[diaSemana(p.fecha)]} · ${MESES[p.fecha.getMonth()].slice(0, 3)}</span>
      </div>
      <div class="fila-cuerpo">
        ${turnos.length
          ? turnos.map((t) => `
              <span class="etiqueta" style="--color:${t.color}">
                ${t.nombre}${t.entrada ? ` · ${t.entrada}–${t.salida}` : ''}
              </span>`).join('')
          : '<span class="fila-vacia">sin asignar</span>'}
        ${g && g.linea ? `<span class="fila-detalle">Línea ${g.linea}${g.coche ? ` · coche ${g.coche}` : ''}</span>` : ''}
        ${g && g.nota ? `<span class="fila-nota">${g.nota}</span>` : ''}
      </div>
      ${min ? `<div class="fila-horas">${enHoras(min)}</div>` : ''}
    </li>`;
}
