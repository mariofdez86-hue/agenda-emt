// Router, menu lateral y arranque. Una ruta por pantalla, cargadas a demanda.

const RUTAS = {
  agenda:       { titulo: 'Agenda',       icono: '📅', modulo: () => import('./pantallas/agenda.js') },
  calendario:   { titulo: 'Calendario',   icono: '🗓', modulo: () => import('./pantallas/calendario.js') },
  cambios:      { titulo: 'Cambios',      icono: '🔄', modulo: () => import('./pantallas/cambios.js') },
  vacaciones:   { titulo: 'Vacaciones',   icono: '🌴', modulo: () => import('./pantallas/vacaciones.js') },
  estadisticas: { titulo: 'Estadísticas', icono: '📊', modulo: () => import('./pantallas/estadisticas.js') },
  festivos:     { titulo: 'Festivos',     icono: '🎉', modulo: () => import('./pantallas/festivos.js') },
  cocheras:     { titulo: 'Cocheras',     icono: '🚍', modulo: () => import('./pantallas/cocheras.js') },
  convenio:     { titulo: 'Convenio',     icono: '📋', modulo: () => import('./pantallas/convenio.js') },
  telefonos:    { titulo: 'Teléfonos',    icono: '📞', modulo: () => import('./pantallas/telefonos.js') },
  perfil:       { titulo: 'Perfil',       icono: '👤', modulo: () => import('./pantallas/perfil.js') },
};

const INICIO = 'calendario';

const contenedor = document.querySelector('#pantalla');
const rotulo = document.querySelector('#rotulo');
const menu = document.querySelector('#menu');
const velo = document.querySelector('#velo');

/** Monta las entradas del menu desde las rutas: una sola lista que mantener. */
function montaMenu() {
  menu.querySelector('.menu-lista').innerHTML = Object.entries(RUTAS).map(([id, r]) => `
    <li><button class="menu-item" data-ruta="${id}">
      <span class="menu-icono">${r.icono}</span>${r.titulo}
    </button></li>`).join('');

  menu.querySelectorAll('[data-ruta]').forEach((b) => {
    b.onclick = () => { cierraMenu(); location.hash = b.dataset.ruta; };
  });
}

function abreMenu()  { menu.classList.add('abierto');  velo.classList.add('abierto'); }
function cierraMenu(){ menu.classList.remove('abierto'); velo.classList.remove('abierto'); }

async function navega() {
  const id = location.hash.slice(1) || INICIO;
  const ruta = RUTAS[id];

  if (!ruta) { location.hash = INICIO; return; }

  rotulo.textContent = ruta.titulo;
  document.querySelectorAll('[data-ruta]').forEach((b) => {
    b.classList.toggle('activo', b.dataset.ruta === id);
  });

  try {
    const pantalla = await ruta.modulo();
    contenedor.innerHTML = '';
    pantalla.render(contenedor);
    contenedor.scrollTop = 0;
  } catch (e) {
    console.error(e);
    contenedor.innerHTML = `<div class="aviso"><p>No se pudo abrir ${ruta.titulo}.</p>
      <p class="aviso-pie">${e.message}</p></div>`;
  }
}

document.querySelector('#abrir-menu').onclick = abreMenu;
velo.onclick = cierraMenu;
window.addEventListener('hashchange', navega);

montaMenu();
navega();

// Service worker: para que la app abra sin cobertura.
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  navigator.serviceWorker.register('./sw.js').catch((e) => console.warn('SW:', e));
}
