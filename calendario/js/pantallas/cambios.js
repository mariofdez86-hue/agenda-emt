// Cambios · sin empezar. Lo que tiene que hacer, apuntado para no perderlo.

export function render(contenedor) {
  contenedor.innerHTML = `
    <h2 class="pantalla-titulo">Cambios</h2>
    <div class="aviso">
      <p>Los cambios de turno con compañeros. Es lo que Shifter no tiene y nosotros sí necesitamos.</p>
    </div>
    <h3 class="sub">Lo que va aquí</h3>
    <ul class="tareas">
      <li>Pedir un cambio: tu día, el día del compañero y el turno de cada uno.</li>
      <li>Un cambio toca dos días, no uno: los dos se repintan al aceptarlo.</li>
      <li>Estado del cambio: pedido, aceptado, denegado.</li>
      <li>Historial de cambios del mes.</li>
      <li>Compartir la petición por WhatsApp con un texto ya hecho.</li>
    </ul>
  `;
}
