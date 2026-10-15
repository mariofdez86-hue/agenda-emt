// Festivos · sin empezar. Lo que tiene que hacer, apuntado para no perderlo.

export function render(contenedor) {
  contenedor.innerHTML = `
    <h2 class="pantalla-titulo">Festivos</h2>
    <div class="aviso">
      <p>Festivos nacionales, de la Comunidad de Madrid y locales, ya metidos.</p>
    </div>
    <h3 class="sub">Lo que va aquí</h3>
    <ul class="tareas">
      <li>Calendario de festivos del año en curso y del siguiente.</li>
      <li>Marcar los festivos trabajados: generan días y retribución.</li>
      <li>Aviso cuando te caiga un turno en festivo.</li>
      <li>Que se actualicen sin tener que tocar código cada año.</li>
    </ul>
  `;
}
