const cacheName = 'shell-content-4';
const filesToCache = [
    '/',
    '/index.html',
    '/app.js'
];

self.addEventListener('install', e => {
    console.log('SW is installed!!');
    e.waitUntil(
        caches.open(cacheName) // <<<< Opening the cache
            .then(cache => {
                // Adding the required files in the cache >>
                return cache.addAll(filesToCache);
            })
    );
});

self.addEventListener('activate', e => {
    console.log('SW Activated');
    e.waitUntil(
        caches.keys()
        .then(keyList => {
            return Promise.all(keyList.map(key => {
                if (key !== cacheName) {
                    console.log('[SW] removing old cache', key);
                    return caches.delete(key);
                }
            }))
        })
    );
})

self.addEventListener('fetch', e => {
    console.log('SW Fetch', e.request)
    e.respondWith(
        caches.match(e.request)
            .then(response => {
                return response || fetch(e.request);
            })
    );
});