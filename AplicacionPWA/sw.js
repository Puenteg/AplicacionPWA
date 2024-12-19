importScripts('./js/bd.js');

abrirBd();

self.addEventListener('install', (e) => {
  console.log('Service Worker instalado');
});

self.addEventListener('activate', (e) => {
  console.log('Service Worker activado');
});

self.addEventListener('fetch', (e) => {
  e.respondWith(e.request);
});

self.addEventListener('sync', (e) => {
  if (e.tag == 'sync-info-prestamos') {
    e.waitUntil(
      listarPrestamos((prestamos) => {
        prestamos.forEach((prestamo) => {
          if (prestamo.enviado) {
            return;
          }

          fetch('/agregarPrestamo', {
            method: 'POST',
            body: JSON.stringify(prestamo),
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          })
            .then((response) => {
              prestamo.enviado = true;
              editarPrestamo(prestamo);
              const canal = new BroadcastChannel('sw-messages');
              canal.postMessage({
                title: 'generarTabla',
              });
            })
            .catch((error) => {
              console.error('Fallo al sincronizar', error);
            });
        });
      })
    );
  }
});
