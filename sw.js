const cacheName = 'static-cache-01';

self.addEventListener('install', e => {
    caches.open(cacheName)
        .then(cache => {
            cache.addAll(
                [
                    '/',
                    '/index.html',
                    '/app.js'
                ]
            );
        })
});

self.addEventListener('fetch', e => {
    e.respondWith(
        fetch(e.request)
            .catch(_ => {
                return caches.match(e.request);
            })
    );
});

self.addEventListener('sync', async e => {
    if (e.tag === 'showLog') {
        console.log('Log From SW');
    }
}); 