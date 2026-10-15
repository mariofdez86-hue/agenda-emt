// Horas, dias y forzosas del rango que elijas. Las retribuciones de convenio,
// cuando esten las reglas escritas en docs/convenio.md.

import { clave, enHoras } from '../formato.js';
import * as datos from '../datos.js';

export function render(contenedor) {
  const hoy = new Date();
  const desde = clave(new Date(hoy.getFullYear(), hoy.getMonth(), 1));
  const hasta = clave(new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0));

  pinta(contenedor, desde, hasta);
}

function pinta(contenedor, desde, hasta) {
  const r = datos.resumen(desde, hasta);

  contenedor.innerHTML = `
    <h2 class="pantalla-titulo">Estadísticas</h2>

    <div class="rango">
      <label>Desde <input type="date" id="desde" value="${desde}"></label>
      <label>Hasta <input type="date" id="hasta" value="${hasta}"></label>
    </div>

    <div class="cifras">
      <div class="cifra"><b>${enHoras(r.minutos)}</b><span>trabajadas</span></div>
      <div class="cifra"><b>${r.dias}</b><span>días con turno</span></div>
      <div class="cifra"><b>${r.forzosas}</b><span>forzosas</span></div>
      <div class="cifra"><b>${datos.todo().perfil.diasGenerados}</b><span>días generados</span></div>
    </div>

    <h3 class="sub">Por turno</h3>
    <ul class="barras">
      ${datos.turnos().map((t) => {
        const n = r.porTurno[t.id] || 0;
        const tope = Math.max(1, ...Object.values(r.porTurno));
        return `
          <li>
            <span class="barra-nombre">${t.nombre}</span>
            <span class="barra"><i style="width:${(n / tope) * 100}%;background:${t.color}"></i></span>
            <span class="barra-num">${n}</span>
          </li>`;
      }).join('')}
    </ul>

    <p class="pendiente">Las retribuciones salen cuando pasemos las reglas del convenio
    (pluses, nocturnidad y festivos). Orden <code>/convenio</code>.</p>
  `;

  const recalcula = () => pinta(
    contenedor,
    contenedor.querySelector('#desde').value,
    contenedor.querySelector('#hasta').value,
  );
  contenedor.querySelector('#desde').onchange = recalcula;
  contenedor.querySelector('#hasta').onchange = recalcula;
}
