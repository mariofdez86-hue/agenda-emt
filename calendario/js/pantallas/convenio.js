// Convenio · sin empezar. Lo que tiene que hacer, apuntado para no perderlo.

export function render(contenedor) {
  contenedor.innerHTML = `
    <h2 class="pantalla-titulo">Convenio</h2>
    <div class="aviso">
      <p>El convenio a mano, para consultarlo sin buscar el PDF.</p>
    </div>
    <h3 class="sub">Lo que va aquí</h3>
    <ul class="tareas">
      <li>Buscador por palabra dentro del texto.</li>
      <li>Los artículos que más se consultan, a un toque.</li>
      <li>Enlace entre una regla y el cálculo de la app que la usa.</li>
      <li>Las reglas se apuntan primero en docs/convenio.md (orden /convenio).</li>
    </ul>
  `;
}
