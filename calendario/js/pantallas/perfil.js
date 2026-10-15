// Tus datos, tus turnos y el respaldo. Los datos no salen del movil.

import * as datos from '../datos.js';

export function render(contenedor) {
  const p = datos.todo().perfil;

  contenedor.innerHTML = `
    <h2 class="pantalla-titulo">Perfil</h2>

    <div class="campos">
      <label>Nombre <input id="nombre" value="${p.nombre}" placeholder="Tu nombre"></label>
      <label>Grupo <input id="grupo" value="${p.grupo}" placeholder="Ej. 3B"></label>
      <label>Cochera <input id="cochera" value="${p.cochera}" placeholder="Ej. Sanchinarro"></label>
      <label>Días generados <input id="generados" type="number" min="0" value="${p.diasGenerados}"></label>
    </div>

    <h3 class="sub">Tus turnos</h3>
    <ul class="turnos-lista">
      ${datos.turnos().map((t) => `
        <li>
          <i class="punto" style="background:${t.color}"></i>
          <b>${t.nombre}</b>
          <span>${t.entrada ? `${t.entrada}–${t.salida}` : 'sin horario'}</span>
          ${t.partido ? '<span class="chip">partido</span>' : ''}
        </li>`).join('')}
    </ul>
    <p class="pendiente">Editar turnos (nombre, color y horas) todavía no está hecho.</p>

    <h3 class="sub">Respaldo</h3>
    <div class="botones">
      <button id="exporta">Exportar a fichero</button>
      <button id="importa">Importar de fichero</button>
    </div>
    <input type="file" id="fichero" accept="application/json" hidden>
    <p class="aviso-pie">Los datos viven solo en este móvil. Sin cuentas y sin servidores.</p>
  `;

  const guarda = () => datos.cambiaPerfil({
    nombre: contenedor.querySelector('#nombre').value,
    grupo: contenedor.querySelector('#grupo').value,
    cochera: contenedor.querySelector('#cochera').value,
    diasGenerados: Number(contenedor.querySelector('#generados').value) || 0,
  });
  ['#nombre', '#grupo', '#cochera', '#generados'].forEach((s) => {
    contenedor.querySelector(s).onchange = guarda;
  });

  contenedor.querySelector('#exporta').onclick = () => {
    const url = URL.createObjectURL(new Blob([datos.exportar()], { type: 'application/json' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `calendario-emt-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const fichero = contenedor.querySelector('#fichero');
  contenedor.querySelector('#importa').onclick = () => fichero.click();
  fichero.onchange = async () => {
    if (!fichero.files.length) return;
    try {
      datos.importar(await fichero.files[0].text());
      render(contenedor);
      alert('Respaldo importado.');
    } catch (e) {
      alert(`No se pudo importar: ${e.message}`);
    }
  };
}
