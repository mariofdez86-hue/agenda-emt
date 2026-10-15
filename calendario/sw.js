// Service worker: la app tiene que abrir en una cochera sin cobertura.
// Si anades un fichero al proyecto, metelo aqui y sube la version de la cache.

const CACHE = 'calendario-v1';

const FICHEROS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/estilos.css',
  './js/app.js',
  './js/datos.js',
  './js/formato.js',
  './js/pantallas/agenda.js',
  './js/pantallas/calendario.js',
  './js/pantallas/cambios.js',
  './js/pantallas/vacaciones.js',
  './js/pantallas/estadisticas.js',
  './js/pantallas/festivos.js',
  './js/pantallas/cocheras.js',
  './js/pantallas/convenio.js',
  './js/pantallas/telefonos.js',
  './js/pantallas/perfil.js',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      // uno a uno: si falta un fichero, no se cae la instalacion entera
      .then((c) => Promise.allSettled(FICHEROS.map((f) => c.add(f))))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((claves) => Promise.all(claves.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

// Primero la red (para ver los cambios al desarrollar), y si no hay, la cache.
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then((r) => {
        if (r.ok && new URL(e.request.url).origin === location.origin) {
          const copia = r.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copia));
        }
        return r;
      })
      .catch(() => caches.match(e.request).then((r) => r || caches.match('./index.html'))),
  );
});
