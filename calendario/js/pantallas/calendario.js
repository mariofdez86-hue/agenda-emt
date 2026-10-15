// El mes pintado. Es la pantalla de casa: lo que se mira veinte veces al dia.
// Modo pintar: eliges turno abajo y vas tocando dias.

import { rejilla, mesLargo, DIAS, esHoy } from '../formato.js';
import * as datos from '../datos.js';

let anio = new Date().getFullYear();
let mes = new Date().getMonth();
let pincel = null;        // id del turno seleccionado, o null para solo mirar

export function render(contenedor) {
  const dias = rejilla(anio, mes);
  const turnos = datos.turnos();

  contenedor.innerHTML = `
    <div class="mes-barra">
      <button class="mes-flecha" data-mueve="-1" aria-label="Mes anterior">‹</button>
      <h2 class="mes-titulo">${mesLargo(anio, mes)}</h2>
      <button class="mes-flecha" data-mueve="1" aria-label="Mes siguiente">›</button>
    </div>

    <div class="mes-semana">${DIAS.map((d) => `<span>${d}</span>`).join('')}</div>

    <div class="mes-rejilla">
      ${dias.map((d) => celda(d)).join('')}
    </div>

    <div class="pincel">
      <p class="pincel-titulo">${pincel ? 'Toca los días para pintar' : 'Elige un turno para pintar'}</p>
      <div class="pincel-turnos">
        ${turnos.map((t) => `
          <button class="pincel-turno${pincel === t.id ? ' elegido' : ''}"
                  data-pincel="${t.id}" style="--color:${t.color}">
            <b>${t.corto}</b><span>${t.nombre}</span>
          </button>`).join('')}
      </div>
    </div>
  `;

  contenedor.querySelectorAll('[data-mueve]').forEach((b) => {
    b.onclick = () => {
      mes += Number(b.dataset.mueve);
      if (mes < 0) { mes = 11; anio--; }
      if (mes > 11) { mes = 0; anio++; }
      render(contenedor);
    };
  });

  contenedor.querySelectorAll('[data-pincel]').forEach((b) => {
    b.onclick = () => {
      pincel = pincel === b.dataset.pincel ? null : b.dataset.pincel;
      render(contenedor);
    };
  });

  contenedor.querySelectorAll('[data-dia]').forEach((c) => {
    c.onclick = () => {
      if (!pincel) return;                     // sin pincel, solo se mira
      datos.pinta(c.dataset.dia, pincel);
      // Solo se repinta la celda tocada: asi se pueden pintar diez dias
      // seguidos sin que el mes entero parpadee en cada toque.
      c.querySelector('.dia-marcas').innerHTML = marcas(c.dataset.dia);
    };
  });
}

function celda(d) {
  return `
    <button class="dia${d.relleno ? ' relleno' : ''}${esHoy(d.clave) ? ' hoy' : ''}"
            data-dia="${d.clave}">
      <span class="dia-num">${d.fecha.getDate()}</span>
      <span class="dia-marcas">${marcas(d.clave)}</span>
    </button>`;
}

/** Los puntos de color de un dia: uno por turno pintado, hasta dos. */
function marcas(clave) {
  const guardado = datos.dia(clave);
  return (guardado ? guardado.turnos : []).map((id) => {
    const t = datos.turno(id);
    return t ? `<i class="marca" style="background:${t.color}" title="${t.nombre}"></i>` : '';
  }).join('');
}
