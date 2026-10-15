// Teléfonos · sin empezar. Lo que tiene que hacer, apuntado para no perderlo.

export function render(contenedor) {
  contenedor.innerHTML = `
    <h2 class="pantalla-titulo">Teléfonos</h2>
    <div class="aviso">
      <p>Los teléfonos que hacen falta durante el turno.</p>
    </div>
    <h3 class="sub">Lo que va aquí</h3>
    <ul class="tareas">
      <li>Centro de control, cocheras y taller.</li>
      <li>Llamar con un toque desde el móvil.</li>
      <li>Buscador por nombre.</li>
      <li>Nada de teléfonos reales de compañeros en el repo: los de ejemplo, inventados.</li>
    </ul>
  `;
}
