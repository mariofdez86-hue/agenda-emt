// Vacaciones · sin empezar. Lo que tiene que hacer, apuntado para no perderlo.

export function render(contenedor) {
  contenedor.innerHTML = `
    <h2 class="pantalla-titulo">Vacaciones</h2>
    <div class="aviso">
      <p>Petición y cómputo de vacaciones según convenio.</p>
    </div>
    <h3 class="sub">Lo que va aquí</h3>
    <ul class="tareas">
      <li>Vista del año entero para elegir periodos.</li>
      <li>Días de vacaciones que te quedan.</li>
      <li>Cómo cuentan los días según convenio (pendiente de pasar las reglas).</li>
      <li>Avisos de los plazos de petición.</li>
    </ul>
  `;
}
