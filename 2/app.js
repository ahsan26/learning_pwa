if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(registered => {
            console.log('SW Registered: ', registered);
        })
        .catch(err => {
            console.log('Err', err);
        });
}