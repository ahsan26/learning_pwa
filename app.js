navigator.serviceWorker.register('/sw.js')
    .then(_ => navigator.serviceWorker.ready)
    .then(registration => {
        document.getElementById('btn').addEventListener('click', _ => {
            console.log('click');
            registration.sync.register('showLog')
        });
    })
    .catch(err => {
        console.log('SW not registered!!');
    });
