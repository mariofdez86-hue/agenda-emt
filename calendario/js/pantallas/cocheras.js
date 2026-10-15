// Cocheras · sin empezar. Lo que tiene que hacer, apuntado para no perderlo.

export function render(contenedor) {
  contenedor.innerHTML = `
    <h2 class="pantalla-titulo">Cocheras</h2>
    <div class="aviso">
      <p>Cocheras, líneas y coches. De dónde sales y con qué.</p>
    </div>
    <h3 class="sub">Lo que va aquí</h3>
    <ul class="tareas">
      <li>Lista de cocheras de EMT con dirección y cómo llegar.</li>
      <li>Líneas que salen de cada cochera.</li>
      <li>Guardar tu cochera habitual en el Perfil.</li>
      <li>Apuntar la línea y el coche en el detalle del día.</li>
    </ul>
  `;
}
