if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(registration => {
            console.log('SW REGISTERED~~~~~!', registration);
        })
        .catch(err => {
            console.log('SW Not Registered!!!', err);
        });
}