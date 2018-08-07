const STATIC_CACHE = 'static-files-01';
const filesToCache = [
    '/',
    '/app.js',
    '/index.html',
    '/offline.html'
];

self.addEventListener('install', e => {
    console.log('SW installed!');
    e.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                return cache.addAll(filesToCache);
            })
    );
});

self.addEventListener('activate', e => {
    console.log('SW activated!');
    e.waitUntil(
        caches.keys()
            .then(keys => {
                return Promise.all(keys.map(key => {
                    if (key !== STATIC_CACHE) {
                        return caches.delete(key);
                    }
                }));
            })
    );
});

self.addEventListener('fetch', e => {
    console.log('FETCH', e.request);
    e.respondWith(
        fetch(e.request)
            .then(res => {
                console.log('FROM Network', e.request);
                return res;
            })
            .catch(err => {
                console.log('FROM Cache', e.request);
                return caches.match(e.request)
                    .then(async res => {
                        if (!res) {
                            console.log('offline', await caches.match('/offline.html'));
                            return await caches.match('/offline.html');
                        }
                        return res;
                    })
            })
    );
});